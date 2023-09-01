import { defineConfig } from 'vite'
import { crx, defineManifest } from '@crxjs/vite-plugin'

import packageJson from './package.json'
const { version } = packageJson

const [major, minor, patch] = version.replace(/[^\d.-]+/g, '').split(/[.-]/)

const manifest = defineManifest({
  manifest_version: 3,
  name: 'Random Tab',
  description: 'This extension open a random tab from window. ',
  version: `${major}.${minor}.${patch}`,
  version_name: version,
  //   icons: {
  //     '16': 'public/icon-16.png',
  //     '48': 'public/icon-48.png',
  //     '128': 'public/icon-128.png',
  //   },
  action: {
    // default_icon: {
    //   '16': 'public/icon-16.png',
    //   '48': 'public/icon-48.png',
    //   '128': 'public/icon-128.png',
    // },
    default_title: 'Random Tab'
  },
  commands: {
    open_random_tab: {
      suggested_key: {
        default: 'Alt+R'
      },
      description: 'Open a random tab from window.'
    },
    close_and_open_random_tab: {
      suggested_key: {
        default: 'Alt+W'
      },
      description: 'Close current tab and open a random tab from window.'
    }
  },
  background: {
    service_worker: 'src/background.ts',
    type: 'module'
  },
  permissions: []
})

export default defineConfig({
  plugins: [crx({ manifest })]
})
