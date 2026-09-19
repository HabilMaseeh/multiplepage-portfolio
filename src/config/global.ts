export const globalConfig = {
  site: {
    name: "AI Web application Engineer",
    author: "Habil Maseeh",
    description: "A brief description of your portfolio website",
    url: "/"
  },
  navigation: {
    aria: "Main Navigation",
    items: [
      {
        title: "Home",
        href: "/"
      },
      {
        title: "Projects",
        href: "/projects"
      },
      {
        title: "Posts",
        href: "/posts"
      },
      {
        title: "About",
        href: "/about"
      }
    ]
  },
  footer: {
    aria: "Footer Navigation",
    social: {
      twitter: "#",
      github: "https://github.com/HabilMaseeh",
      email: "info.dessolutions@gmail.com",
      phone: "+923085874609",
      whatsapp: "https://wa.me/923085874609",
      whatsappQr: "https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=https%3A%2F%2Fwa.me%2F923085874609"
    }
  }
} as const; 