"use client";

/**
 * Base UI Navigation Menu with high-end glassmorphic styling,
 * smooth floating transitions, and refined modern border radius.
 */

import * as React from "react";
import { NavigationMenu as BaseNav } from "@base-ui/react/navigation-menu";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* ─── Types ─────────────────────────────────────────────────── */

export type NavigationMenuSize = "default" | "compact";
export type NavigationMenuAlign = "start" | "center" | "end";

export type NavigationMenuTone = "light" | "dark";

export interface NavigationMenuProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof BaseNav.Root>,
    "value" | "defaultValue" | "onValueChange" | "delay"
  > {
  size?: NavigationMenuSize;
  tone?: NavigationMenuTone;
  delayDuration?: number;
  skipDelayOnSwitch?: boolean;
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  popupClassName?: string;
}

export type NavigationMenuListProps = React.ComponentPropsWithoutRef<typeof BaseNav.List>;

export type NavigationMenuItemProps = React.ComponentPropsWithoutRef<typeof BaseNav.Item>;

export interface NavigationMenuTriggerProps
  extends React.ComponentPropsWithoutRef<typeof BaseNav.Trigger> {
  showChevron?: boolean;
}

export interface NavigationMenuContentProps
  extends React.ComponentPropsWithoutRef<typeof BaseNav.Content> {
  width?: string;
  align?: NavigationMenuAlign;
}

export interface NavigationMenuLinkProps
  extends React.ComponentPropsWithoutRef<typeof BaseNav.Link> {
  asChild?: boolean;
}

export type NavigationMenuIconProps = React.ComponentPropsWithoutRef<typeof BaseNav.Icon>;

export type NavigationMenuDescriptionProps = React.HTMLAttributes<HTMLSpanElement>;

export interface NavigationMenuSubProps {
  children: React.ReactNode;
}

export type NavigationMenuSubTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export type NavigationMenuSubContentProps = React.HTMLAttributes<HTMLDivElement>;

export type NavigationMenuGroupProps = React.HTMLAttributes<HTMLDivElement>;

export type NavigationMenuGroupHeadingProps = React.HTMLAttributes<HTMLHeadingElement>;

/* ─── Density context ───────────────────────────────────────── */

const NavigationMenuSizeContext =
  React.createContext<NavigationMenuSize>("default");
const useNavSize = () => React.useContext(NavigationMenuSizeContext);

/* ─── Constants ─────────────────────────────────────────────── */

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

const overlaySurfaceClass = cn(
  "border border-neutral-200/80 bg-white/95 text-neutral-900",
  "shadow-[0_24px_60px_-12px_rgba(0,0,0,0.12),0_4px_16px_rgba(0,0,0,0.04)]",
  "backdrop-blur-2xl ring-1 ring-black/[0.03]",
);

const darkOverlaySurfaceClass = cn(
  "border border-white/10 bg-neutral-950/90 text-white",
  "shadow-[0_24px_60px_-12px_rgba(0,0,0,0.5),0_4px_16px_rgba(0,0,0,0.2)]",
  "backdrop-blur-2xl ring-1 ring-white/[0.05]",
);

const popupMotionClass = cn(
  "origin-[var(--transform-origin)] transform-gpu outline-none",
  "transition-[opacity,scale,transform] duration-[200ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
  "data-[ending-style]:duration-[140ms]",
  "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
  "data-[starting-style]:scale-[0.97] data-[ending-style]:scale-[0.97]",
  "data-[starting-style]:translate-y-[-6px] data-[ending-style]:translate-y-[-6px]",
  "motion-reduce:transition-none motion-reduce:data-[starting-style]:scale-100 motion-reduce:data-[ending-style]:scale-100",
);

const viewportMotionClass = cn(
  "relative overflow-hidden",
  "transition-[width,height] duration-[240ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
  "motion-reduce:transition-none",
);

/* ─── <NavigationMenu> ──────────────────────────────────────── */

export const NavigationMenu = React.forwardRef<
  HTMLElement,
  NavigationMenuProps
>(function NavigationMenu(
  {
    size = "default",
    tone = "light",
    delayDuration = 100,
    skipDelayOnSwitch: _skip,
    value: valueProp,
    defaultValue,
    onValueChange,
    className,
    popupClassName,
    children,
    "aria-label": ariaLabel = "Main navigation",
    ...props
  },
  ref,
) {
  void _skip;
  const handleValueChange = React.useMemo(
    () =>
      onValueChange
        ? (v: unknown) => onValueChange((v ?? null) as string | null)
        : undefined,
    [onValueChange],
  );

  return (
    <NavigationMenuSizeContext.Provider value={size}>
      <BaseNav.Root
        ref={ref as React.Ref<HTMLElement>}
        delay={delayDuration}
        value={valueProp as never}
        defaultValue={defaultValue as never}
        onValueChange={handleValueChange as never}
        data-size={size}
        aria-label={ariaLabel}
        className={cn("relative", className)}
        {...props}
      >
        {children}
        <BaseNav.Portal>
          <BaseNav.Positioner
            collisionPadding={16}
            sideOffset={tone === "dark" ? 8 : 10}
            className="z-[130] outline-none"
          >
            <BaseNav.Popup
              className={cn(
                tone === "dark" ? darkOverlaySurfaceClass : overlaySurfaceClass,
                "rounded-2xl",
                popupMotionClass,
                popupClassName,
              )}
            >
              <BaseNav.Viewport className={viewportMotionClass} />
            </BaseNav.Popup>
          </BaseNav.Positioner>
        </BaseNav.Portal>
      </BaseNav.Root>
    </NavigationMenuSizeContext.Provider>
  );
});

/* ─── <NavigationMenuList> ──────────────────────────────────── */

export const NavigationMenuList = React.forwardRef<
  HTMLUListElement,
  NavigationMenuListProps
>(function NavigationMenuList({ className, ...props }, ref) {
  const size = useNavSize();
  return (
    <BaseNav.List
      ref={ref}
      className={cn(
        "flex list-none items-center",
        size === "compact" ? "gap-0.5" : "gap-1",
        className,
      )}
      {...props}
    />
  );
});

/* ─── <NavigationMenuItem> ──────────────────────────────────── */

export const NavigationMenuItem = React.forwardRef<
  HTMLLIElement,
  NavigationMenuItemProps
>(function NavigationMenuItem({ className, ...props }, ref) {
  return (
    <BaseNav.Item
      ref={ref}
      className={cn("relative", className)}
      {...props}
    />
  );
});

/* ─── <NavigationMenuTrigger> ───────────────────────────────── */

export const NavigationMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  NavigationMenuTriggerProps
>(function NavigationMenuTrigger(
  { className, showChevron = true, children, ...props },
  ref,
) {
  const size = useNavSize();
  return (
    <BaseNav.Trigger
      ref={ref}
      className={cn(
        "group/nav-item relative inline-flex select-none items-center gap-1.5 rounded-xl font-medium outline-none cursor-pointer",
        "transition-all duration-200 ease-out motion-reduce:transition-none",
        "text-neutral-700 hover:text-neutral-950 hover:bg-black/[0.04]",
        "data-[popup-open]:text-neutral-950 data-[popup-open]:bg-black/[0.05]",
        "focus-visible:ring-2 focus-visible:ring-blue-500/40",
        "active:scale-[0.98] motion-reduce:active:scale-100",
        size === "compact"
          ? "px-2.5 py-1.5 text-[13px]"
          : "px-3.5 py-2 text-[13.5px]",
        className,
      )}
      {...props}
    >
      {children}
      {showChevron && (
        <IconChevronDown
          size={size === "compact" ? 12 : 13}
          stroke={2.5}
          className={cn(
            "shrink-0 text-neutral-400 transition-transform duration-200 ease-out group-hover/nav-item:text-neutral-600 motion-reduce:transition-none",
            "group-data-[popup-open]/nav-item:rotate-180 group-data-[popup-open]/nav-item:text-blue-600",
          )}
        />
      )}
    </BaseNav.Trigger>
  );
});

/* ─── <NavigationMenuContent> ───────────────────────────────── */

export const NavigationMenuContent = React.forwardRef<
  HTMLDivElement,
  NavigationMenuContentProps
>(function NavigationMenuContent(
  { className, width, align: _align, children, ...props },
  ref,
) {
  void _align;
  return (
    <BaseNav.Content
      ref={ref}
      className={cn("outline-none p-3.5", width, className)}
      {...props}
    >
      {children}
    </BaseNav.Content>
  );
});

/* ─── <NavigationMenuLink> ──────────────────────────────────── */

export const NavigationMenuLink = React.forwardRef<
  HTMLAnchorElement,
  NavigationMenuLinkProps
>(function NavigationMenuLink(
  { className, asChild, active, children, ...props },
  ref,
) {
  const size = useNavSize();
  const linkClass = cn(
    "group/nav-link inline-flex select-none items-center gap-2 rounded-xl font-medium outline-none",
    "transition-all duration-150 ease-out motion-reduce:transition-none",
    "text-neutral-800 hover:text-neutral-950 hover:bg-blue-50/80",
    "data-[active]:text-blue-600 data-[active]:bg-blue-50",
    "focus-visible:ring-2 focus-visible:ring-blue-500/40",
    "active:scale-[0.98] motion-reduce:active:scale-100",
    size === "compact"
      ? "px-2.5 py-1.5 text-[13px]"
      : "px-3 py-2 text-[14px]",
    className,
  );

  if (asChild && React.isValidElement(children)) {
    return (
      <BaseNav.Link
        ref={ref}
        active={active}
        render={children as React.ReactElement}
        className={linkClass}
        {...props}
      />
    );
  }

  return (
    <BaseNav.Link
      ref={ref}
      active={active}
      className={linkClass}
      {...props}
    >
      {children}
    </BaseNav.Link>
  );
});

/* ─── <NavigationMenuIcon> ──────────────────────────────────── */

export const NavigationMenuIcon = React.forwardRef<
  HTMLSpanElement,
  NavigationMenuIconProps
>(function NavigationMenuIcon({ className, ...props }, ref) {
  const size = useNavSize();
  return (
    <BaseNav.Icon
      ref={ref}
      className={cn(
        "inline-flex shrink-0 items-center justify-center text-neutral-400",
        "group-hover/nav-item:text-neutral-700 group-hover/nav-link:text-blue-600 transition-colors duration-150 motion-reduce:transition-none",
        size === "compact" ? "size-4" : "size-5",
        className,
      )}
      {...props}
    />
  );
});

/* ─── <NavigationMenuDescription> ───────────────────────────── */

export const NavigationMenuDescription = React.forwardRef<
  HTMLSpanElement,
  NavigationMenuDescriptionProps
>(function NavigationMenuDescription({ className, ...props }, ref) {
  const size = useNavSize();
  return (
    <span
      ref={ref}
      className={cn(
        "block text-neutral-500 leading-snug font-normal",
        "group-hover/nav-link:text-neutral-600 transition-colors duration-150 motion-reduce:transition-none",
        size === "compact" ? "text-[11px]" : "text-[12px]",
        className,
      )}
      {...props}
    />
  );
});

/* ─── <NavigationMenuSub> (custom, click-toggle) ────────────── */

type NavigationMenuSubContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  contentId: string;
};

const NavigationMenuSubContext =
  React.createContext<NavigationMenuSubContextValue | null>(null);

function useNavigationMenuSubContext(): NavigationMenuSubContextValue {
  const ctx = React.useContext(NavigationMenuSubContext);
  if (!ctx) {
    throw new Error(
      "NavigationMenuSub components must be used within <NavigationMenuSub>",
    );
  }
  return ctx;
}

export function NavigationMenuSub({ children }: NavigationMenuSubProps) {
  const [open, setOpen] = React.useState(false);
  const reactId = React.useId();
  const ctx = React.useMemo<NavigationMenuSubContextValue>(
    () => ({ open, setOpen, contentId: `nav-sub-${reactId}` }),
    [open, reactId],
  );

  return (
    <NavigationMenuSubContext.Provider value={ctx}>
      <div className="relative">{children}</div>
    </NavigationMenuSubContext.Provider>
  );
}
NavigationMenuSub.displayName = "NavigationMenuSub";

export const NavigationMenuSubTrigger = React.forwardRef<
  HTMLButtonElement,
  NavigationMenuSubTriggerProps
>(function NavigationMenuSubTrigger(
  { className, children, onClick, ...props },
  ref,
) {
  const { open, setOpen, contentId } = useNavigationMenuSubContext();
  const prefersReducedMotion = useReducedMotion();
  return (
    <button
      ref={ref}
      type="button"
      data-slot="navigation-menu-sub-trigger"
      data-state={open ? "open" : "closed"}
      aria-expanded={open}
      aria-controls={contentId}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) setOpen(!open);
      }}
      className={cn(
        "relative flex w-full cursor-default select-none items-center gap-2 rounded-xl px-3 py-2 text-sm outline-none",
        "transition-colors duration-150 ease-out motion-reduce:transition-none",
        "text-neutral-800 hover:bg-neutral-100",
        "focus-visible:ring-2 focus-visible:ring-blue-500/40",
        "active:scale-[0.98] motion-reduce:active:scale-100",
        className,
      )}
      {...props}
    >
      {children}
      <span className="ml-auto flex items-center">
        <motion.span
          aria-hidden="true"
          animate={{ rotate: open ? 90 : 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.18, ease: EASE_OUT }
          }
          className="flex items-center justify-center text-neutral-400"
        >
          <IconChevronRight size={14} stroke={2} />
        </motion.span>
      </span>
    </button>
  );
});

export const NavigationMenuSubContent = React.forwardRef<
  HTMLDivElement,
  NavigationMenuSubContentProps
>(function NavigationMenuSubContent(
  { className, children, ...props },
  ref,
) {
  const { open, contentId } = useNavigationMenuSubContext();
  const prefersReducedMotion = useReducedMotion();

  const {
    onDrag: _1,
    onDragStart: _2,
    onDragEnd: _3,
    onAnimationStart: _4,
    ...safeProps
  } = props;
  void _1; void _2; void _3; void _4;

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          ref={ref}
          id={contentId}
          role="menu"
          data-slot="navigation-menu-sub-content"
          data-state="open"
          initial={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 0, height: 0 }
          }
          animate={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 1, height: "auto" }
          }
          exit={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, height: 0 }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.18, ease: EASE_OUT }
          }
          className={cn("overflow-hidden pl-4", className)}
          {...safeProps}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
});

/* ─── <NavigationMenuGroup> ─────────────────────────────────── */

export const NavigationMenuGroup = React.forwardRef<
  HTMLDivElement,
  NavigationMenuGroupProps
>(function NavigationMenuGroup({ className, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      role="group"
      data-slot="navigation-menu-group"
      className={cn("flex flex-col", className)}
      {...props}
    >
      {children}
    </div>
  );
});

/* ─── <NavigationMenuGroupHeading> ──────────────────────────── */

export const NavigationMenuGroupHeading = React.forwardRef<
  HTMLHeadingElement,
  NavigationMenuGroupHeadingProps
>(function NavigationMenuGroupHeading({ className, children, ...props }, ref) {
  return (
    <h4
      ref={ref}
      data-slot="navigation-menu-group-heading"
      className={cn(
        "px-2.5 py-1.5 text-[11px] font-semibold tracking-wider text-neutral-400 uppercase",
        className,
      )}
      {...props}
    >
      {children}
    </h4>
  );
});
