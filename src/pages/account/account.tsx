// import { useState, useEffect } from 'react';
// import { supabase } from '../../supabaseClient';

// export default function Account() {

//   return (
//       <>
//       </>
//   );
// }

import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { Footer } from '../../components/footer/footer';

interface AccountProps {
  session: any;
}

export default function Account({ session }: AccountProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [username, setUsername] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function getProfile() {
      setLoading(true);
      const { user } = session;

      const { data, error } = await supabase
        .from('Users')
        .select(`username, avatar_url`)
        .eq('id', user.id)
        .single();

      if (!ignore) {
        if (error) {
          console.warn(error);
        } else if (data) {
          setUsername(data.username);
          setAvatarUrl(data.avatar_url);
        }
      }

      setLoading(false);
    }

    getProfile();

    return () => {
      ignore = true;
    };
  }, [session]);

  async function updateProfile(event: React.FormEvent, newAvatarUrl: string) {
    event.preventDefault();

    setLoading(true);
    const { user } = session;

    const updates = {
      id: user.id,
      username,
      avatar_url: newAvatarUrl,
    };

    const { error } = await supabase.from('Users').upsert(updates);

    if (error) {
      alert(error.message);
    } else {
      setAvatarUrl(newAvatarUrl);
    }

    setLoading(false);
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          if (avatarUrl !== null) {
            updateProfile(e, avatarUrl);
          } else {
            // Можно выполнить другое действие в случае, если avatarUrl равен null
            console.error('Avatar URL is null');
          }
        }}
        className="form-widget"
      >
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Name</label>
        <input
          id="username"
          type="text"
          required
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <button className="button block primary" type="submit" disabled={loading}>
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button className="button block" type="button" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
    </form>
    <Footer />
    </>
  );
}