const SUPABASE_URL = 'https://zarjoypwcxcuksdxbluy.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphcmpveXB3Y3hjdWtzZHhibHV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQyOTQ3MTEsImV4cCI6MTk3OTg3MDcxMX0.5y0PggF5OAkLdzY6FQnV0VYRwwV_GkbNietUDIFasf0';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */
export async function createItem(item) {
    return await client.from('items').insert(item).single();
}
export async function getItems() {
    return await client.from('items').select('*').order('created_at');
}
export async function boughtItem(id) {
    return await client.from('items').update({ bought: true }).eq('id', id).single();
}
export async function deleteAllItems() {
    const user = getUser();
    return await client.from('items').delete().eq('user_id', user.id);
}
