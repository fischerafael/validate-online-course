import { RecoilProvider } from "@/client/providers/RecoilProvider";
import { Providers } from "@/client/providers";
import { ReactQueryProvider } from "@/client/providers/ReactQueryProvider";

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
          <ReactQueryProvider>
            <RecoilProvider>{children}</RecoilProvider>
          </ReactQueryProvider>
        </Providers>
      </body>
    </html>
  );
}
