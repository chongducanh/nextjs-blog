import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";
import { HelloWorld } from "../component/plasmic/helloworld";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "sgr9ygYR6Myci6ef9wMNUu",  // ID of a project you are using
      token: "QD4GkApI80gEl7q1fWeH6dGc1HvEdtNi8smbLnsXzbTTQgHSiFtGg49DYDlwKkGqdrPej5BMmp00CvKuRkg"  // API token for that project
    }
  ],
  // Fetches the latest revisions, whether or not they were unpublished!
  // Disable for production to ensure you render only published changes.
  preview: true,
})

PLASMIC.registerComponent(HelloWorld, {
  name: 'HelloWorld',
  props: {
    verbose: 'boolean',
    children: 'slot'
  }
});