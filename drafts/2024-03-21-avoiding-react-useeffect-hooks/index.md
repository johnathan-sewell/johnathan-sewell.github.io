---
slug: avoiding-react-useeffect-hooks
title: Avoiding React useEffect Hooks
authors: johnathan
---

Avoiding React useEffect hooks for more predictable and maintainable code.

<!-- truncate -->

## Example: internal state based on a prop value

It may initially seem like useEffect fits here.

```ts
export const Flash = ({ show }: { show: boolean }) => {
  const [internalShow, setInternalShow] = useState(false);

  useEffect(() => {
    if (show) {
      setInternalShow(show);
      setTimeout(() => {
        setInternalShow(false);
      }, 2000);
    }
  }, [show]);

  return (
    <div
      className={classNames("flex text-red transition-opacity duration-300 ease-in-out", {
        "opacity-100": internalShow,
        "opacity-0": !internalShow,
      })}
    >
      <span>Message</span>
    </div>
  );
};
```

We can simply remove the useEffect hook and use the prop value directly.
```ts
export const Flash = ({ show }: { show: boolean }) => {
  const [internalShow, setInternalShow] = useState(false);

  if (show) {
    setInternalShow(show);
    setTimeout(() => {
      setInternalShow(false);
    }, 2000);
  }

  return (
    <div
      className={classNames("flex text-red transition-opacity duration-300 ease-in-out", {
        "opacity-100": internalShow,
        "opacity-0": !internalShow,
      })}
    >
      <span>Message</span>
    </div>
  );
};
```
