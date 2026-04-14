export function Footer() {
  return (
    <footer className="max-w-[1000px] mx-auto mt-10 p-6 border-t border-[var(--border-color)] flex flex-wrap items-center justify-between gap-4">
      <div>
        <div className="font-bold text-[var(--primary)] tracking-widest uppercase">
          SATIRO CONSULTORIA
        </div>
        <div className="text-xs text-[var(--text-muted)] mt-1">
          satiroconsultoria.com · satiroelias@gmail.com · (48) 9 3618-2977
        </div>
      </div>
      <div className="text-right text-xs text-[var(--text-muted)]">
        © 2026 Satiro Consultoria
      </div>
    </footer>
  );
}