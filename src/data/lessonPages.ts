export interface Lesson {
    id: number,
    subtitle: string;
    title: string;
    text1: string;
    text2: string;
    text3: string;
    text4: string;
    text5: string;
    img1: string;
    img2: string;
    img3: string;
    notes: string[];
    practiceImage: string;
}

export const lessonPages: Lesson[] = [
    {
        id: 1,
        subtitle: 'Introduction',
        title: 'Introduction',
        text1: `Hello! This is your first lesson at this platform. This means that you
        are a huge fellow and are already taking the first steps to becoming a very cool!
        In this lesson, you will get acquainted with the basics of the instrument and keys,
        as well as be able to look into the future and find out what lies ahead.`,
        text2: `I want to say right away that playing a virtual piano, you will not be able to
        feel all the charms of playing this wonderful instrument, but you will be able to learn
        the theoretical foundations and decide for yourself whether you want to become a real pianist.
        In this short course, you will learn how black keys differ from white ones, why there are so
        many of them, learn about the signs of alterations and even play your first melodies. Not bad? Let's go!`,
        text3: `The standard piano has 88 keys (both white and black), which are divided into octaves.
        One octave includes 7 white and 5 black keys. The white keys are the main musical notes (A, B, C, D, E, F, G),
        and the black keys are their semitones (sharps and flats). We will start learning the basic notes already
        in this lesson, and we will touch the black keys a little later.`,
        text4: `The octave begins with the note C and ends with the note B. I know it looks strange,
        because why not start with the first letter in the alphabet, A? The thing is that the world
        community of musicians has determined that A is the most perceived note by human hearing, so
        they decided to start naming notes with it.`,
        text5: `The octave located in the center is called 1 octave. All octaves to the right are numbered further
        (for example, 2 octave). The octave to the left of the 1 is called the minor octave, and the octave to the left
        of the minor is the major octave. On this site you can play in minor, 1 and 2 octaves.`,
        img1: '../images/Lesson11.jpg',
        img2: '../images/Lesson12.jpg',
        img3: '../images/Lesson13.jpg',
        notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2'],
        practiceImage: '../images/Lesson13.jpg',
    },
    {
        id: 2,
        subtitle: 'Musical notation p. 1',
        title: 'Musical notation. Part 1',
        text1: `Hi! You did well in the previous lesson! But you don't think that all compositions are written down just like
        that, in letters, do you? In the next few lessons, let's figure out musical notation! In this lesson you will learn
        what is musical staff and treble clef.`,
        text2: `So, musical staff is the kind of thing that notes are written on. It consists of 5 straight lines connected
        at the beginning of the line by one vertical. The notes are recorded both on the lines themselves and between them.
        Higher sounds are recorded on the upper lines, and lower sounds are recorded on the lower ones.
        To determine the position of the notes on the sheet music in piano music, two clefs are used: treble and bass. The
        clefs are placed at the beginning of the musical string.`,
        text3: `Let's talk about the treble clef for now. With the help of a treble clef, the sounds corresponding to the
        right (upper) half of the keyboard are written. The treble clef is also called the G clef, since its curl surrounds
        the line on which the G note of the first octave is located.`,
        text4: `Knowing this, we can easily determine the location on the staff of other sounds in the treble clef! Let's go
        down to the note of C and go up to the note of B. Sometimes not all notes fit into the sheet music, so additional
        lines appear (as in the case of the note C). Sounds easy, right?`,
        text5: ``,
        img1: '../images/Lesson21.jpg',
        img2: '../images/Lesson22.jpg',
        img3: '../images/Lesson23.jpg',
        notes: ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2'],
        practiceImage: '../images/Lesson23.jpg',
    },
    {
        id: 3,
        subtitle: 'Musical notation p. 2',
        title: 'Musical notation. Part 2',
        text1: `Wow, you were incredible in the last lesson! It doesn't seem that difficult, right? But even capybara understands
        that one clef is too little to become a real pianist, so let's move on! In this lesson you will get acquainted with the
        bass clef and the recording of notes in it. Let's go!`,
        text2: `The bass key records low sounds that relate to the left side of the piano keyboard. In this key, the curl begins
        on the fourth line of the note-bearer. In the minor octave on this line is the note F. Here the notes are recorded according
        to the same principle as in the treble clef: higher — high notes, and lower — low notes! Unbelievable! So, on the lines of
        the note-bearer there are notes E (on the additional lower), G, B, D, F, A, C (On the additional upper).`,
        text3: `By the way, as you may have noticed, the octaves on the keyboard are side by side, so the recording of notes in
        different keys and octaves echoes. The note C on the additional upper line in the bass clef is simultaneously the note C
        on the additional lower line in the treble clef.`,
        text4: `Notes F, A, C, E, G, B are distributed between the lines in the bass clef. Usually, it is more difficult to remember
        the notes of the bass clef than the violin clef, but there is a life hack (although it does not help everyone, sometimes it is
        easier to just learn). If you know how notes are written in the treble clef, then to read the notes of the bass clef, you
        can raise the readable notes by 2.`,
        text5: ``,
        img1: '../images/Lesson31.jpg',
        img2: '../images/Lesson32.jpg',
        img3: '../images/Lesson33.jpg',
        notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'A', 'B', 'C', 'D', 'E', 'F', 'G'],
        practiceImage: '../images/Lesson32.jpg',
    },
    {
        id: 4,
        subtitle: 'Alteration Signs',
        title: 'Alteration Signs',
        text1: `Glad to see you again! As you might have guessed from the title, in this lesson you will get acquainted with
        the signs of alterations. But what is it? Up to this point, you played all your tunes only on white keys. It's time
        to use the black ones too!`,
        text2: `Alterations are symbols that are used in musical notation to change the pitch of a note. They are played on
        black keys. The main signs of alterations are sharp (#), flat (♭), and bekar (♮). 
        Sharp (#) increases the pitch of the note by half a tone (so you need to play the right note from the given one).
        Example: If you have a note F (F), adding a sharp (#) in front of it makes it F sharp (F#).`,
        text3: `Flat (♭) lowers the pitch of the note by half a tone (the left note from the given one). 
        Example: If you have a B (B) note, adding a flat (♭) before it makes it B flat (B♭).
        Bekar (♮ ) cancels the sharp or flat effect and returns the note to its original pitch.
        Example: If you have a note F sharp (F#) and after it comes the note F (F), the bekar (♮) before the F cancels the
        sharp and makes it a regular F.`,
        text4: `If the alter sign stands before the note in a certain measure, then it will act only until the end of this
        measure. If the signs of alterations are at the beginning of the work next to the clef, then they act from the beginning
        to the end. Alterations play an important role in musical notation, allowing us to create a variety of musical sounds.`,
        text5: ``,
        img1: '../images/Lesson41.jpg',
        img2: '../images/Lesson42.jpg',
        img3: '../images/Lesson43.jpg',
        notes: ['CSharp', 'DSharp', 'FSharp', 'GSharp', 'ASharp', 'CSharp1', 'DSharp1', 'FSharp1', 'GSharp1', 'ASharp1', 'CSharp2', 'DSharp2', 'FSharp2', 'GSharp2', 'ASharp2', 'CSharp3'],
        practiceImage: '../images/Lesson41.jpg',
    },
    {
        id: 5,
        subtitle: 'Consolidation',
        title: 'Consolidation',
        text1: `Congratulations, you've come a long way! Having memorized everything that you learned in the previous 4 lessons,
        you will be able to read absolutely all the recorded notes! There will be no new information in this lesson, let's just
        briefly repeat what you already know and practice a little more.`,
        text2: `A full octave consists of twelve notes going in the following order: C, C#(D♭), D, D#(E♭), E, F, F#(G♭), G,
        G#(A♭), A, A#(B♭), B. White keys are responsible for ordinary notes, and black keys are responsible for notes with
        alterations. On the letter, the notes are indicated by circles and recorded on the sheet music. The treble clef is
        responsible for the high notes, and the bass clef is responsible for the lower notes. Sharp (#) increases the pitch of
        the note by half a tone, Flat (♭) lowers the pitch of the note by half a tone and Bekar (♮ ) cancels the sharp or flat
        effect and returns the note to its original pitch.`,
        text3: `The curl of the treble clef begins on the 2nd line of the musical stanza, on which the note G of the first octave
        stands. On the first lower extension line of the treble clef is the note C of the first octave, and on the first upper
        extension line is the note A of the second octave.`,
        text4: `The curl of the bass clef is located on the 4th line of the notation, corresponding to the F note of the minor
        octave. On the first lower extension line of the bass clef is the note E of the large octave, and on the first upper extension
        line is the note C of the first octave.`,
        text5: `By the way, almost all works (with the exception of the simplest ones) are played with two hands, and often the right
        and left hands play in different clefs (but not always!). In the picture above you can see how the notes for both hands are recorded.
        The alterations in both hands are the same.`,
        img1: '../images/Lesson41.jpg',
        img2: '../images/Lesson52.jpg',
        img3: '../images/Lesson53.jpg',
        notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2',
        'CSharp', 'DSharp', 'FSharp', 'GSharp', 'ASharp', 'CSharp1', 'DSharp1', 'FSharp1', 'GSharp1', 'ASharp1', 'CSharp2', 'DSharp2', 'FSharp2', 'GSharp2', 'ASharp2', 'CSharp3'],
        practiceImage: '../images/Lesson41.jpg',
    },
    {
        id: 6,
        subtitle: 'Note Duration',
        title: 'Duration Of Notes',
        text1: ``,
        text2: ``,
        text3: ``,
        text4: ``,
        text5: ``,
        img1: '',
        img2: '',
        img3: '',
        notes: ['C2', 'A1', 'E1', 'D1', 'C2', 'D2', 'A1', 'E1', 'D1'],
        practiceImage: '../images/Lesson6PracticeCapy.jpg',
    },
]