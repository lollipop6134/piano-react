import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { Footer } from '../../components/footer/footer';
import "./account.css"

interface AccountProps {
  session: any;
}

export default function Account({ session }: AccountProps) {
  const [username, setUsername] = useState<string | null>(null);
  const [id, setId] = useState<number | null>(null);
  const [countLessons, setCountLessons] = useState(0);
  const [countCompletedLessons, setCountCompletedLessons] = useState(0);

  useEffect(() => {

    async function getProfile() {

      const { data, error } = await supabase
        .from('Users')
        .select(`id, username, completedLessons`)
        .single();

        if (error) {
          alert(error.message);
        } else if (data) {
          setId(data.id);
          setUsername(data.username);
          setCountCompletedLessons(data.completedLessons.length);
        }
    }

    async function getLessons() {

      const { data, error } = await supabase
      .from('Lessons')
      .select(`id`);

      if (error) {
        alert(error.message);
      } else if (data) {
        setCountLessons(data.length);
      }
    }

    getProfile();
    getLessons();
  }, [session]);

  async function updateProfile(event: React.FormEvent) {
    event.preventDefault();

    const updates = {
      username: username,
    };

    console.log(username, id)

    const { error } = await supabase.from('Users').update(updates).match({id: id})

    if (error) {
      alert(error.message);
    } else {
      alert(`OK!`)
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
        Your progress: {countCompletedLessons}/{countLessons} ({Math.round(countCompletedLessons/countLessons*100)}%)
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