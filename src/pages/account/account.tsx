import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { Footer } from '../../components/footer/footer';
import "./account.css"

interface AccountProps {
  session: any;
}

export default function Account({ session }: AccountProps) {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {

    async function getProfile() {
      const { user } = session;

      const { data, error } = await supabase
        .from('Users')
        .select(`username`)
        .eq('id', user.id)
        .single();

        if (error) {
          console.warn(error);
        } else if (data) {
          setUsername(data.username);
        }
    }

    getProfile();
  }, [session]);

  async function updateProfile(event: React.FormEvent) {
    event.preventDefault();

    const updates = {
      username,
    };

    const { error } = await supabase.from('Users').upsert(updates);

    if (error) {
      alert(error.message);
    }
  }

  return (
    <>
      <form onSubmit={(e) => {updateProfile(e)}} >
      <div id='accountInputs'>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            value={session.user.email}
            disabled
          />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            required
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>
      <div id='progress'>
        Your progress: 6/12 (50%)
      </div>
      <div id='accountButtons'>
        <button type="submit">Update</button>
        <button type="button" onClick={() => supabase.auth.signOut()}>Sign Out</button>
      </div>
    </form>
    <div className='bottom'>
      <Footer />
    </div>
    </>
  );
}