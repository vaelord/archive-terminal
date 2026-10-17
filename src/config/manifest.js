export const manifest = {
  "site": {
    "collectionName": "Ether Archive",
    "supply": "4,088",
    "mintDate": null,
    "apiBaseUrl": "https://ether-archive-api.e-gndz-33.workers.dev",
    "presaleCheckPath": "/api/presale/check",
    "openSeaUrl": "https://opensea.io/collection/ether-archive",
    "xUrl": "https://x.com/EthArchiveNFT",
    "reminderUrl": "https://opensea.io/collection/ether-archive",
    "telegramUrl": "https://t.me/etherarxhive",
    "wlCampaignTweetUrl": "https://x.com/EthArchiveNFT/status/2111504475462484098?s=20",
    "wlApiBaseUrl": "https://ether-archive-wl-api.e-gndz-33.workers.dev",
    "farcasterUrl": "https://farcaster.xyz/etharchivenft",
    "discordUrl": "https://discord.gg/QC9aAzyFwc",
    "wlPath": "/fcfs"
  },
  "brand": {
    "logoText": "ETHER",
    "logoSuffix": "ARCHIVE"
  },
  "links": {
    "home": "#home",
    "mint": "#mint",
    "about": "#about",
    "presale": "#presale",
    "roadmap": "#roadmap",
    "faq": "#faq",
    "footerTop": "#home"
  },
  "navigation": {
    "mint": {
      "label": "MINT",
      "href": "#mint"
    },
    "about": {
      "label": "ABOUT",
      "href": "#about"
    },
    "presale": {
      "label": "PRESALE",
      "href": "#presale"
    },
    "openSeaLabel": "OPENSEA",
    "xLabel": "X / TWITTER",
    "telegramLabel": "TELEGRAM"
  },
  "hero": {
    "eyebrow": "A RECORD OF THE NETWORK",
    "indexLabel": "[ 001 — 4088 ]",
    "titleLine1": "THE SKY",
    "titleLine2": "REMEMBERS",
    "titlePunctuation": ".",
    "description": "4,088 unique skies shaped by the history of Ethereum. Each one is a one-of-one digital artwork, part of a shared record of the traces we leave behind.",
    "reminderLabel": "SETUP REMINDER ON OPENSEA",
    "presaleLabel": "CHECK PRESALE",
    "scrollLabel": "SCROLL TO EXPLORE",
    "metaPrimary": "4,088 / 1 OF 1",
    "metaSecondary": "ETHEREUM · DIGITAL ART"
  },
  "countdown": {
    "units": {
      "days": "DAYS",
      "hours": "HOURS",
      "minutes": "MINUTES",
      "seconds": "SECONDS"
    }
  },
  "mint": {
    "eyebrow": "THE ARCHIVE OPENS",
    "dateHeading": "TO BE ANNOUNCED",
    "timeLabel": "TBA",
    "subLabel": "ON-CHAIN ARTIFACTS"
  },
  "presale": {
    "eyebrow": "ACCESS / 01",
    "titleLine1": "YOUR PLACE",
    "titleLine2": "IN THE ARCHIVE",
    "titlePunctuation": ".",
    "description": "Connect your Ethereum wallet to check whether it has been included in the presale allowlist.",
    "panelLabel": "ALLOWLIST VERIFICATION",
    "networkLabel": "ETH MAINNET",
    "connectTitle": "CONNECT WALLET",
    "connectedTitle": "WALLET CONNECTED",
    "walletPrompt": "Connect the wallet you intend to use. Your address will be checked against the project allowlist.",
    "eligibleTitle": "YOU ARE ELIGIBLE.",
    "eligibleDescription": "Wallet verified against the allowlist.",
    "ineligibleTitle": "NOT ON THE LIST",
    "securityNote": "NEVER SHARE YOUR SEED PHRASE OR PRIVATE KEY.",
    "loadingButton": "PLEASE WAIT",
    "connectButton": "CONNECT WALLET",
    "retryButton": "CHECK AGAIN",
    "messages": {
      "noWallet": "No Ethereum wallet detected. Install MetaMask or open this page in a wallet-enabled browser.",
      "rejected": "Wallet connection was rejected.",
      "connectError": "Could not connect to the wallet. Please try again.",
      "eligible": "You are eligible.",
      "ineligible": "This wallet is not on the presale allowlist.",
      "apiError": "The allowlist API could not be reached from this site. Check the API URL, backend status, and allowed origin.",
      "corsError": "The backend rejected this website origin (CORS). Its FRONTEND_URL must exactly match the address shown in the browser, including https:// and www if present.",
      "httpError": "The allowlist API returned an HTTP error. Check the API response and backend logs."
    },
    "sectionIndex": "ACCESS / 01",
    "checkingMessage": "Checking allowlist…",
    "connectingMessage": "Connecting wallet…",
    "notEligibleTitle": "NOT ON THE LIST",
    "apiContract": {
      "method": "POST",
      "path": "/api/presale/check",
      "requestBody": {
        "wallet": "0x0000000000000000000000000000000000000000"
      },
      "successResponse": {
        "eligible": true
      },
      "ineligibleResponse": {
        "eligible": false
      }
    }
  },
  "about": {
    "sectionIndex": "01 / THE IDEA",
    "sectionLabel": "ABOUT THE ARCHIVE",
    "sections": [
      {
        "eyebrow": "A TRACE BECOMES A STAR",
        "titleLine1": "EVERY BLOCK",
        "titleLine2": "LEAVES A TRACE",
        "titlePunctuation": ".",
        "paragraphs": [
          "Ethereum is more than a network. It is a continuously growing record of human activity, ideas, experiments, and exchanges.Every interaction becomes part of a history shared across the network. Ether Archive explores this history through a different lens — translating the idea of digital traces into a collection of imagined skies.",
          "Each artwork is a fragment of a much larger story: a visual reflection on what we create, what we leave behind, and what remains."
        ],
        "linkLabel": "EXPLORE THE COLLECTION",
        "linkHref": "site.openSeaUrl",
        "image": "",
        "imageAlt": "Ether Archive — first conceptual artwork",
        "imageLabel": "IMAGE PLACEHOLDER — 01",
        "imageCode": "EA—001"
      },
      {
        "eyebrow": "A MATHEMATICAL MEMORY",
        "titleLine1": "THE NETWORK,",
        "titleLine2": "REIMAGINED",
        "titlePunctuation": ".",
        "paragraphs": [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed odio dui. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas faucibus mollis interdum."
        ],
        "linkLabel": "DISCOVER THE JOURNEY",
        "linkHref": "#roadmap",
        "image": "",
        "imageAlt": "Ether Archive — second conceptual artwork",
        "imageLabel": "IMAGE PLACEHOLDER — 02",
        "imageCode": "04:088"
      }
    ]
  },
  "artwork": {
    "caption": "FIG. 001 — NETWORK MEMORY",
    "verticalCaption": "TRACE / PRESERVE / REMEMBER",
    "imageOneCode": "EA—001",
    "imageTwoCode": "04:088",
    "heroImage": "",
    "heroImageAlt": "Abstract orbital artwork inspired by an Ethereum night sky",
    "starfield": {
      "enabled": true,
      "count": 110,
      "minimumOpacity": 0.18,
      "opacityRange": 0.7,
      "color": "#ffffff"
    },
    "brandMark": {
      "enabled": true,
      "shape": "diamond"
    }
  },
  "roadmap": {
    "eyebrow": "02 / THE TIMELINE",
    "title": "THE ROAD AHEAD",
    "titlePunctuation": ".",
    "description": "One archive. A timeline still being written.",
    "items": [
      {
        "date": "31 OCT",
        "title": "PROJECT LAUNCH",
        "description": "THE ARCHIVE OPENS",
        "opacity": 1
      },
      {
        "date": "TBA",
        "title": "COMING SOON",
        "description": "DETAILS TO FOLLOW",
        "opacity": 0.5
      },
      {
        "date": "TBA",
        "title": "COMING SOON",
        "description": "DETAILS TO FOLLOW",
        "opacity": 0.5
      },
      {
        "date": "TBA",
        "title": "COMING SOON",
        "description": "DETAILS TO FOLLOW",
        "opacity": 0.5
      }
    ],
    "sectionLabel": "02 / THE TIMELINE"
  },
  "faq": {
    "eyebrow": "03 / GOOD TO KNOW",
    "titleLine1": "QUESTIONS,",
    "titleLine2": "ANSWERED",
    "titlePunctuation": ".",
    "description": "A few details before the archive opens.",
    "items": [
      [
        "What is Ether Archive?",
        "Ether Archive is a generative cosmic data-archive capturing the immutable history of the Ethereum blockchain. It converts true on-chain block data (hashes, gas usage, timestamps, and miner/validator signatures) into unique celestial and constellation maps."
      ],
      [
        "Are these images randomly generated?",
        "No. Every single piece is deterministically rendered from actual Ethereum block data. The cryptographic hash determines the star coordinates, network activity dictates the cosmic dust density, and historical metrics define stellar temperatures and eras."
      ],
      [
        "Is every piece unique?",
        "Yes. Each work is generated from a distinct set of parameters within the generation system."
      ],
      [
        "What is the total supply of the collection?",
        "The collection consists of a strictly limited supply of 4,088 unique pieces, representing historical milestones and blocks on the Ethereum network."
      ],
      [
        "How are royalties (creator earnings) handled?",
        "To support the continuous development and preservation of the archive, creator earnings are enforced on-chain at a healthy, collector-friendly rate."
      ]
    ],
    "sectionLabel": "03 / GOOD TO KNOW"
  },
  "footer": {
    "taglineLine1": "A record of the network.",
    "taglineLine2": "A memory of what we leave behind.",
    "exploreLabel": "EXPLORE",
    "followLabel": "FOLLOW",
    "links": {
      "mint": "Mint",
      "about": "About",
      "presale": "Presale check",
      "roadmap": "Roadmap",
      "faq": "FAQ"
    },
    "openSeaLabel": "OpenSea",
    "xLabel": "X / Twitter",
    "copyright": "© 2026 ETHER ARCHIVE",
    "bottomLine": "MADE OF TRACES. BUILT TO REMEMBER.",
    "backToTop": "BACK TO TOP ↑",
    "exploreLinks": {
      "mintHref": "#mint",
      "aboutHref": "#about",
      "presaleHref": "#presale",
      "roadmapHref": "#roadmap",
      "faqHref": "#faq"
    },
    "backToTopHref": "#home",
    "telegramLabel": "Telegram"
  },
  "accessibility": {
    "toggleNavigation": "Toggle navigation",
    "openSea": "OpenSea collection",
    "xProfile": "Ether Archive on X",
    "orbitalArtwork": "Abstract orbital artwork inspired by an Ethereum night sky",
    "home": "Ether Archive home",
    "countdown": "Time until mint",
    "telegram": "Ether Archive on Telegram"
  },
  "fonts": {
    "heading": "Exo 2",
    "paragraph": "Work Sans",
    "monospace": "IBM Plex Mono",
    "googleFontsUrl": "https://fonts.googleapis.com/css2?family=Exo+2:wght@400;500;600;700&family=Work+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
  },
  "assets": {
    "favicon": "/favicon.svg",
    "logoSvg": "/logos/ether-archive-mark.svg",
    "heroImage": "",
    "aboutImageOne": "",
    "aboutImageTwo": "",
    "openSeaIcon": "/logos/opensea.svg",
    "xIcon": "/logos/x.svg",
    "imageBehavior": "No raster artwork is used. Hero and About visuals are CSS geometry. Replace SVG files in public/logos/ to customize marks.",
    "telegramIcon": "/logos/telegram.svg",
    "farcasterIcon": "/logos/farcaster.svg",
    "discordIcon": "/logos/discord.svg"
  },
  "terminal": {
    "commands": [
      { "key": "mint", "command": "//mint", "label": "MINT", "description": "Minting details", "output": "The archive holds 4,088 skies. Each is a singular reflection of the traces left across Ethereum. When the time comes, the archive opens." },
      { "key": "presale_check", "command": "//presale_check", "label": "PRESALE CHECK", "description": "Checking your eligibility", "output": "Every archive has its witnesses. Discover whether your wallet has a place among those invited to the opening." },
      { "key": "about", "command": "//about", "label": "ABOUT", "description": "About Ether Archive", "output": "Ethereum is a history written without a final page. Every exchange, every encounter, every passing moment leaves a trace. Ether Archive gathers the feeling of this endless record and imagines it as a sky — a place where fragments of a shared past become something we can look upon. 4,088 skies. 4,088 singular perspectives on what remains." },
      { "key": "faq", "command": "//faq", "label": "FAQ", "description": "Frequently asked questions", "output": "Some stories deserve a closer look. Find your place within the archive." },
      { "key": "roadmap", "command": "//roadmap", "label": "ROADMAP", "description": "Project roadmap", "output": "The archive is still unfolding. Some pages remain unwritten; their time will come." }
    ],
    "faqItems": [
      ["What is Ether Archive?", "Ether Archive is a collection of 4,088 unique skies inspired by the traces left on Ethereum. Each artwork is a one-of-one fragment of a much larger story — a portrait of a network that remembers."],
      ["How many pieces are in the collection?", "4,088. Each sky stands alone, yet all belong to the same endless horizon."],
      ["When does the project launch?", "Every archive has its opening. The moment will be revealed when the time is right."],
      ["How do I check presale eligibility?", "Some will find their names among the invited. Visit the presale check to discover whether a place in the archive awaits you."],
      ["Where can I follow updates?", "The story continues beyond these pages. Follow Ether Archive on X and explore the collection on OpenSea."]
    ],
    "roadmapItems": [
      { "date": "TBA", "title": "THE ARCHIVE OPENS", "description": "Every story begins somewhere. This one begins with the traces we leave behind.", "className": "roadmap-current" },
      { "date": "TBA", "title": "THE STORY CONTINUES", "description": "Some horizons have yet to reveal themselves.", "className": "roadmap-future" }
    ],
    "introPhrases": ["//mint to approach the archive", "//presale_check to find your place", "//about to discover the story", "//faq to explore the unknown", "//roadmap to follow the unfolding"],
    "typing": { "pauseAtEnd": 850, "typeSpeed": 35, "pauseAtStart": 120, "deleteSpeed": 12, "outputSpeed": 7 },
    "countdownUnits": { "days": "D", "hours": "H", "minutes": "M", "seconds": "S" },
    "countdownTba": "TBA",
    "countdownAriaLabel": "Time to launch",
    "availableCommands": "AVAILABLE COMMANDS",
    "commandCount": "[ {count} ]",
    "commandArrow": "↗",
    "selectCommand": "SELECT A COMMAND TO CONTINUE",
    "outputBrand": "STDOUT / ETHER ARCHIVE",
    "outputCommand": "COMMAND: {command}",
    "awaitingInput": "AWAITING INPUT",
    "nextHint": "type //next for next page",
    "openSeaAction": "OPEN OPENSEA ↗",
    "mintStatus": "PUBLIC MINT / TBA",
    "walletNotConnected": "WALLET: NOT CONNECTED",
    "verifyingButton": "VERIFYING…",
    "retryButton": "CHECK AGAIN",
    "connectWalletButton": "CONNECT WALLET ↗",
    "collectionAction": "VIEW COLLECTION ↗",
    "collectionMeta": "{supply} / 1 OF 1",
    "faqCollapse": "−",
    "faqExpand": "+",
    "inputPlaceholder": "type a command and press enter…",
    "inputAriaLabel": "Enter a site command",
    "enterButton": "ENTER ↵",
    "homeHref": "#top",
    "homeAriaLabel": "Ether Archive home",
    "wlAccessLabel": "WL ACCESS ↗",
    "socialLinksAriaLabel": "Project links",
    "launchCaption": "TIME TO LAUNCH",
    "mintDateLabel": "MINT DATE",
    "mintDateTba": "TBA",
    "networkLabel": "NETWORK: ETHEREUM MAINNET",
    "socialLabels": { "openSea": "OpenSea", "x": "X", "telegram": "Telegram", "farcaster": "Farcaster", "discord": "Discord" },
    "apiFallbackPath": "/api/presale/check",
    "apiMethod": "POST",
    "walletRequestField": "wallet",
    "commandAliases": { "home": ["home"], "clear": ["clear"], "next": ["next"], "previous": ["prev", "previous", "back"] },
    "messages": {
      "unknownCommand": "UNKNOWN COMMAND: {input}. Try {commands}, or {next}.",
      "emptyInput": "(empty)",
      "noWallet": "No Ethereum wallet detected. Open this site in MetaMask or install a wallet extension.",
      "apiHttpError": "API returned HTTP {status}",
      "unexpectedApiResponse": "Unexpected response from allowlist API.",
      "eligible": "ACCESS GRANTED — YOU ARE ELIGIBLE.",
      "ineligible": "ACCESS DENIED — WALLET NOT FOUND IN ALLOWLIST.",
      "walletRejected": "WALLET CONNECTION REJECTED.",
      "walletError": "COULD NOT VERIFY ELIGIBILITY."
    }
  }

};
