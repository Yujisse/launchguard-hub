<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- Passive URL scans run only in server functions via src/lib/scan.server.ts, which re-validates every hop (scheme, port, DNS-over-HTTPS IP check) and never reads response bodies — why: SSRF safety and no sensitive content in reports.
