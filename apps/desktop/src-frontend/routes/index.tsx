import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@workspace/ui/components/empty";
import { Download, FolderOpen, Scissors, Video } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: EditorShell,
});

function EditorShell() {
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    // `app_version` is a Rust command exposed by the Tauri shell. Under a plain
    // browser (`pnpm dev:web`) there is no IPC, so the call rejects and we ignore
    // it — this is just a smoke test that the JS↔Rust bridge is wired up.
    import("@tauri-apps/api/core")
      .then(({ invoke }) => invoke<string>("app_version"))
      .then(setVersion)
      .catch(() => {});
  }, []);

  return (
    <div className="bg-background text-foreground flex h-screen flex-col">
      <header className="flex items-center justify-between border-b px-4 py-2">
        <div className="flex items-center gap-2">
          <Scissors className="text-primary size-5" />
          <span className="font-semibold">SwiftCut</span>
          {version && <span className="text-muted-foreground text-xs">v{version}</span>}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            <FolderOpen /> Import clip
          </Button>
          <Button size="sm" disabled>
            <Download /> Export
          </Button>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center overflow-hidden p-6">
        <Empty className="border-none">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Video />
            </EmptyMedia>
            <EmptyTitle>No clip loaded</EmptyTitle>
            <EmptyDescription>
              Import a video to start trimming. Editing runs fully on your machine — no account, no
              cloud.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button disabled>
              <FolderOpen /> Import clip
            </Button>
          </EmptyContent>
        </Empty>
      </main>

      <footer className="bg-muted/30 h-32 border-t p-3">
        <div className="text-muted-foreground flex h-full items-center justify-center rounded-md border border-dashed text-sm">
          Timeline
        </div>
      </footer>
    </div>
  );
}
