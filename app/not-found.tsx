import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-32 text-center">
      <h1 className="text-6xl font-bold text-fd-muted-foreground">404</h1>
      <p className="text-lg text-fd-muted-foreground">这个页面不存在，可能已被移动或删除。</p>
      <Link
        href="/"
        className="rounded-full bg-fd-primary px-6 py-3 text-sm font-medium text-fd-primary-foreground transition-opacity hover:opacity-90"
      >
        回到首页
      </Link>
    </div>
  );
}
