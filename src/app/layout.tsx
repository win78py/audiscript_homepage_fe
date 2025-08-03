import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { mainLayoutAntdConfig } from "@/base/configs/antdConfig";
import "./globals.css";
import { App, ConfigProvider } from "antd";
import MainLayout from "./components/MainLayout";
import { typoConfig } from "@/base/configs/typographyConfig";

export const metadata: Metadata = {
  title: "Audiscript",
  description: "Audio to text converter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="icon"
          type="image/svg+xml"
          href="https://res.cloudinary.com/dekmn1kko/image/upload/v1726824769/artall_icon.png"
        />
      </head>
      <body>
          <style>{typoConfig}</style>
          <AntdRegistry>
            <ConfigProvider theme={mainLayoutAntdConfig}>
                <MainLayout>{children}</MainLayout>
            </ConfigProvider>
          </AntdRegistry>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              if (typeof window !== "undefined") {
                let prevPath = '';
                const observer = new MutationObserver(() => {
                  const currentPath = window.location.pathname;
                  if (currentPath !== prevPath) {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    prevPath = currentPath;
                  }
                });
                observer.observe(document.body, { childList: true, subtree: true });
              }
            `,
            }}
          />
          {/* <script
            src="/js/toss-standard.js"
            integrity="sha512-KaYrXKRxVwybCvWeTiOYPOWHUUjn7LcvR2cTRhuzUzMar314sGv4YX5NqugZaj5lRN5ulzCk+j52ew+CD6ZMLA=="
            crossOrigin="anonymous"
            defer
          ></script>
          <script src="https://js.tosspayments.com/v2/standard"></script> */}
        
      </body>
    </html>
  );
}
