---
slug: compound-component
title: React Compound Component Pattern
authors: johnathan
tags: [react, compound-components]
---

### React Compound Component Pattern

#### The Compound Component Pattern

In React the Compound Component pattern is a way to create a component that exposes it's internal structure. This allows the external user to have greater control over the rendering of the child components.

For example a [Select component](https://www.smashingmagazine.com/2021/08/compound-components-react/) might expose it's options to the parent component, allowing the parent to control the layout and behaviour of the options.

#### A Layout Component

A reusable layout component can be created using the Compound Component pattern, the external user has more clarity over the layout and can control the rendering of the child components.

```ts
export function Layout2Columns({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto mt-5 flex flex-col gap-5 md:flex-row">
      {children}
    </div>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-12">{children}</div>;
}

function SideBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex grow md:min-w-80">
      <div
        className="no-scrollbar overflow-y-scroll md:fixed md:w-80"
        style={{ height: "calc(-100px + 100vh)" }}
      >
        {children}
      </div>
    </div>
  );
}

Layout2Columns.Content = Content;
Layout2Columns.SideBar = SideBar;
```

The external user can use this component as below. Without this pattern changing behaviour might require passing extra props.

```tsx
<Layout2Columns>
  <Layout2Columns.Content>
    <p>Content</p>
    <Footer className="hidden bg-transparent md:block" />
  </Layout2Columns.Content>

  <Layout2Columns.SideBar>
    <p>Sidebar</p>
  </Layout2Columns.SideBar>
  <Footer className="block bg-transparent md:hidden" />
</Layout2Columns>
```
