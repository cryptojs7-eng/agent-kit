# Claude Code on the server: safe permanent permissions

Safe permissions for Claude Code on the TIKALGO server:
- everyday development commands run without prompting;
- sensitive actions ask first;
- dangerous actions are blocked.

**Not recommended:** `bypassPermissions`. If the confirmations are tiring, use `"defaultMode": "auto"` instead.

**Usage:** put the JSON below in `/root/tikalgo/.claude/settings.local.json`. If the file already exists, merge it rather than replacing it. Then validate it with `jq . file` and restart Claude Code.

```json
{
  "permissions": {
    "defaultMode": "acceptEdits",
    "allow": [
      "Bash(ls *)", "Bash(cat *)", "Bash(head *)", "Bash(tail *)", "Bash(grep *)", "Bash(rg *)",
      "Bash(find *)", "Bash(wc *)", "Bash(pwd)", "Bash(mkdir *)", "Bash(cp *)", "Bash(mv *)",
      "Bash(git status*)", "Bash(git diff*)", "Bash(git log*)", "Bash(git add *)",
      "Bash(git commit *)", "Bash(git checkout *)", "Bash(git branch*)", "Bash(git fetch*)", "Bash(git pull*)",
      "Bash(npm *)", "Bash(npx *)", "Bash(pnpm *)", "Bash(yarn *)", "Bash(node *)", "Bash(tsc *)",
      "Bash(python *)", "Bash(python3 *)", "Bash(pip *)", "Bash(uv *)", "Bash(pytest *)",
      "Bash(graphify *)", "Bash(ollama list*)", "Bash(ollama ps*)",
      "Bash(docker ps*)", "Bash(docker logs *)", "Bash(docker compose ps*)", "Bash(docker compose logs*)",
      "Bash(systemctl status *)", "Bash(journalctl *)", "Bash(pm2 list*)", "Bash(pm2 logs*)",
      "Bash(curl -s *)", "Bash(curl -sS *)"
    ],
    "ask": [
      "Bash(git push*)", "Bash(docker compose up*)", "Bash(docker compose down*)",
      "Bash(docker compose restart*)", "Bash(systemctl restart *)", "Bash(pm2 restart*)",
      "Bash(rm *)", "Bash(psql *)", "Bash(redis-cli *)"
    ],
    "deny": [
      "Bash(sudo *)", "Bash(rm -rf /*)", "Bash(shutdown*)", "Bash(reboot*)", "Bash(mkfs*)", "Bash(dd *)",
      "Bash(git push --force*)", "Bash(git push -f*)", "Bash(git reset --hard*)",
      "Bash(chmod -R 777*)", "Bash(ufw *)", "Bash(iptables *)", "Bash(crontab *)",
      "Read(./.env)", "Read(./.env.*)", "Read(**/secrets/**)", "Read(~/.ssh/**)"
    ]
  }
}
```

## Removing an Anthropic API key from Claude Code (switch to subscription login)

1. Inside Claude Code, run `/status` to check the current login method, then `/logout`.
2. In the shell, clear the variables for the current session:
   ```bash
   unset ANTHROPIC_API_KEY ANTHROPIC_AUTH_TOKEN
   ```
3. Find where they are set permanently and remove those lines:
   ```bash
   grep -n "ANTHROPIC" ~/.bashrc ~/.profile ~/.zshrc /etc/environment
   ```
4. Check `~/.claude/settings.json` for `apiKeyHelper` or `env` keys and remove them.
5. Start `claude`, run `/login` and choose the Claude account.
