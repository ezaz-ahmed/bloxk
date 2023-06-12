import { execSync } from 'child_process';
import detect from 'detect-port';

export async function setupE2etest() {
  await startSupabase();
  reseedDB();
}

async function startSupabase() {
  const port = detect(64321);

  if (port !== 64321) {
    return;
  }
  console.warn('Subpabase not detected - starting it now!');
  execSync('npx supabase start');
}

function reseedDB() {
  execSync(
    'PGPASSWORD=postgres psql -U postgres 127.0.0.1 -p 64322 -f supabase/clear-db-data.sql',
    {
      stdio: 'ignore',
    }
  );
}
