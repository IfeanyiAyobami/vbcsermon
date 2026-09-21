# Persistent playback

The player now saves progress locally in the visitor's browser.

- Position is saved about every 5 seconds, on pause, seek, page hide and player changes.
- Reloading/reopening restores the last sermon and exact saved position without autoplay.
- Starting a previously heard sermon resumes its saved position.
- Progress is remembered independently for multiple sermons.
- Sermons at 95%+ are treated as completed and removed from Continue Listening.
- Home page includes a responsive Continue Listening section.
- No sign-in or Supabase migration is required.

Storage keys: `vbc-player-state-v1` and `vbc-sermon-progress-v1`.
