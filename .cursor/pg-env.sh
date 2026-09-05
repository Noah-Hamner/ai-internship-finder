#!/usr/bin/env bash
# Shared PostgreSQL environment settings for local Cloud Agent development.
# Sourced by install.sh and start.sh.

export PGDATA="${PGDATA:-$HOME/pgdata}"
export PGPORT="${PGPORT:-5432}"
export PGDATABASE="${PGDATABASE:-internship}"
export PGHOST="${PGHOST:-localhost}"

# Resolve the installed PostgreSQL bin directory (e.g. /usr/lib/postgresql/16/bin).
if [ -z "${PG_BIN:-}" ]; then
  PG_BIN="$(dirname "$(ls -d /usr/lib/postgresql/*/bin/pg_ctl 2>/dev/null | sort -V | tail -n1)")"
fi
export PG_BIN
export PATH="$PG_BIN:$PATH"

# Local development connection string used by the Next.js app (lib/db.ts).
export DEV_DATABASE_URL="postgres://${USER}@127.0.0.1:${PGPORT}/${PGDATABASE}"
