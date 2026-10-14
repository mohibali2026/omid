import { BASE_PATH } from "./base-path";

// Campaign+ (Aseel AidOS) settings for omid.af.
// These scripts point at Aseel's dev environment; switch to the production
// CDN before launch.
export const AIDOS_CDN = "https://cdn.aseelapp.com/dev";
export const AIDOS_ORGANIZATION = "organization_01KF5R16DFFNY757JS72FGF59E";

// The Be the Hope campaign in Campaign+.
export const BE_THE_HOPE_CAMPAIGN = "camp_01KVAEYGP7BF02GSWJY9JDAYTA";

// widget-v1.js opens the donation dialog whenever the URL hash carries a campaign.
// Rooted at "/" so links from other pages land on Home with the dialog open.
export const donateHref = (campaign = BE_THE_HOPE_CAMPAIGN) =>
  BASE_PATH ? `${BASE_PATH}#?campaign=${campaign}` : `/#?campaign=${campaign}`;

// Campaign+ widgets embedded on the site.
export const DONATION_FORM_WIDGET = "widget_01M4T1W298C8QY4CANCV1KV768";
