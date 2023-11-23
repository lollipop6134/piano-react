import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

interface ProfileProps {
  session: any;
}

export default function Profile({ session }: ProfileProps) {

  return (
        <>
        profile works!
        </>
  );
}