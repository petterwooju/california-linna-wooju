import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the revised California itinerary", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /California, Linna &amp; Wooju/);
  assert.match(html, /40<\/b><span>ROUTE STOPS/);
  assert.match(html, /6<\/b><span>HOTEL STAYS/);
  assert.match(html, /Golden Gate Park 与 Mission/);
  assert.match(html, /Camarillo → Malibu 海岸线/);
  assert.match(html, /<h4>San Francisco International Airport<small>DAY /);
  assert.match(html, /9\/22 — 9\/26/);
  assert.match(html, /9\/30 — 10\/2/);
  assert.doesNotMatch(html, /death-valley-ranch|Mesquite Flat Sand Dunes|Badwater Basin/);
  assert.doesNotMatch(html, /FRAME BY FRAME|目的地影像|出发前，记住这四件事|href="#notes"/);
});

test("keeps every map stop ordered and timed", async () => {
  const { allRoutePoints, hotelStays, optimizedDays, routePointTimes } = await import("../app/route-data.ts");

  assert.equal(optimizedDays.length, 14);
  assert.equal(allRoutePoints.length, 40);
  assert.equal(hotelStays.length, 6);
  assert.equal(hotelStays.find((hotel) => hotel.id === "hotel-caza")?.nights, 4);
  assert.equal(hotelStays.find((hotel) => hotel.id === "shore-hotel")?.nights, 2);
  assert.equal(hotelStays.some((hotel) => hotel.id.includes("death-valley")), false);

  for (const day of optimizedDays) {
    day.points.forEach((point, index) => {
      assert.equal(point.day, day.day);
      assert.equal(point.order, index + 1);
      assert.ok(routePointTimes[point.id], `missing planned time for ${point.id}`);
      assert.doesNotMatch(point.name, /[\u3400-\u9FFF]/, `non-English attraction name: ${point.name}`);
      assert.ok(Number.isFinite(point.travelMinutes));
      assert.ok(Number.isFinite(point.visitMinutes));
    });
  }
});

test("uses a non-WebGL map with a readable fallback", async () => {
  const pageSource = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(pageSource, /import\("leaflet"\)/);
  assert.match(pageSource, /server\.arcgisonline\.com/);
  assert.match(pageSource, /tile\.openstreetmap\.org/);
  assert.match(pageSource, /activateFallback/);
  assert.match(pageSource, /地图暂时无法加载/);
  assert.match(pageSource, /底图网络受限/);
  assert.doesNotMatch(pageSource, /maplibre|WebGL/i);
});
