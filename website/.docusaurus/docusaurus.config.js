export default {
  "plugins": [],
  "themes": [],
  "customFields": {},
  "themeConfig": {
    "navBar": {
      "title": "Redux-Leaves",
      "links": [
        {
          "to": "intro/overview",
          "label": "Overview",
          "position": "left"
        },
        {
          "href": "https://runkit.com/richardcrng/redux-leaves-playground",
          "label": "Demo",
          "position": "left",
          "external": true
        },
        {
          "to": "redux-leaves",
          "label": "Docs",
          "position": "left"
        },
        {
          "href": "https://github.com/richardcrng/redux-leaves",
          "label": "GitHub",
          "position": "right",
          "external": true
        }
      ]
    },
    "footer": {
      "copyright": "Copyright © 2020 Richard Ng"
    },
    "sidebarCollapsible": true
  },
  "presets": [
    [
      "@docusaurus/preset-classic",
      {
        "docs": {
          "path": "../docs",
          "sidebarPath": "/Users/richard/Development/repos/personal/redux-leaves/website/sidebars.json"
        }
      }
    ]
  ],
  "title": "Redux-Leaves",
  "tagline": "Write once. Reduce anywhere.",
  "url": "https://redux-leaves.netlify.com/",
  "baseUrl": "/",
  "projectName": "redux-leaves",
  "organizationName": "richardcrng",
  "favicon": "img/favicon.png",
  "scripts": [
    "https://buttons.github.io/buttons.js",
    "https://embed.runkit.com"
  ]
};