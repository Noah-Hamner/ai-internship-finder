#!/usr/bin/env bash
# Per-boot startup: ensure the local PostgreSQL server is running and the
# jobs table exists. Idempotent and safe to run on every boot.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=/dev/null
source "$SCRIPT_DIR/pg-env.sh"

if [ ! -d "$PGDATA/base" ]; then
  echo "PostgreSQL data directory not found at $PGDATA; initializing."
  "$PG_BIN/initdb" -D "$PGDATA" -U "$USER" --auth=trust >/dev/null
fi

# Start the server if it is not already accepting connections.
if ! "$PG_BIN/pg_isready" -h "$PGHOST" -p "$PGPORT" -q; then
  echo "Starting PostgreSQL on port $PGPORT."
  "$PG_BIN/pg_ctl" -D "$PGDATA" \
    -o "-p $PGPORT -k /tmp -c listen_addresses='127.0.0.1'" \
    -l "$PGDATA/server.log" -w start
fi

# Ensure the application database exists.
if ! "$PG_BIN/psql" -h "$PGHOST" -p "$PGPORT" -d postgres -tAc \
    "SELECT 1 FROM pg_database WHERE datname='$PGDATABASE'" | grep -q 1; then
  echo "Creating database $PGDATABASE."
  "$PG_BIN/createdb" -h "$PGHOST" -p "$PGPORT" "$PGDATABASE"
fi

# Ensure the schema exists (idempotent).
"$PG_BIN/psql" -h "$PGHOST" -p "$PGPORT" -d "$PGDATABASE" -v ON_ERROR_STOP=1 \
  -f "$SCRIPT_DIR/init-db.sql" >/dev/null

echo "PostgreSQL is ready at $DEV_DATABASE_URL"
