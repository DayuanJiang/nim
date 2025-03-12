import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    table: ({ children }: { children: React.ReactNode }) => (
      <div className="relative w-full overflow-x-auto">
        <table className="w-[800px]">{children}</table>
      </div>
    ),
    Cover: ({
      src,
      alt,
      caption,
    }: {
      src: string
      alt: string
      caption: string
    }) => {
      return (
        <figure>
          <img src={src} alt={alt} className="rounded-xl" />
          <figcaption className="text-center">{caption}</figcaption>
        </figure>
      )
    },
    // Add styling for code blocks
    pre: ({
      children,
      ...props
    }: {
      children: React.ReactNode
      className?: string
    }) => {
      return (
        <pre className="" {...props}>
          {children}
        </pre>
      )
    },
    code: ({
      children,
      className,
      ...props
    }: {
      children: React.ReactNode
      className?: string
    }) => {
      const match = /language-(\w+)/.exec(className || '')
      return match ? (
        <code className={className} {...props}>
          {children}
        </code>
      ) : (
        <code className="" {...props}>
          {children}
        </code>
      )
    },
  }
}
