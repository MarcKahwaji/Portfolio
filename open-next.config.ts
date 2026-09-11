import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// The site is fully prerendered with no revalidation, so prerendered routes
// (page, og image, icons, sitemap, robots) are served from static assets.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
