import { RecoilProvider } from "@/client/Provider/RecoilProvider";
import { Providers } from "@/client/providers";

export const metadata = {
  title: "Insta Course Validator",
  description: "Validate your course in seconds",
  icons: [{ rel: "icon", url: "/logo.svg" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <RecoilProvider>{children}</RecoilProvider>
        </Providers>
      </body>
    </html>
  );
}
