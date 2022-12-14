import { MDXRemote } from "next-mdx-remote";
import { MarkdownResult } from "../utils";

const ZaisteReactMarkdown = ({ children }: { children: MarkdownResult }) => {
  return (
    <MDXRemote
      {...children}
      components={{
        a: ({ href, ...props }) => {
          if (!href) {
            return <a {...props}></a>;
          }
          return (
            // <Link href={href}>
            //   <a {...props} ></a>
            // </Link>
            <a {...props} href={href} rel="noopener noreferrer"></a>
          );
        },
      }}
    ></MDXRemote>
  );
};

export default ZaisteReactMarkdown;
