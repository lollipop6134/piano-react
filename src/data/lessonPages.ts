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
        subtitle: 'Consolidation 1',
        title: 'Consolidation 1',
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
        title: 'Duration of Notes',
        text1: `You're doing great, keep it up! But I think you understand that this is not enough. Now you and I need to figure out the
        durations of sounds. In practice, we will not study this topic, but will begin to learn your first work! But don't think that everything
        is so simple, a test awaits you at the end of the topic!`,
        text2: `The duration of musical sounds is measured by counting uniform time intervals. It is customary to take a quarter note as a unit
        of reference, which is depicted as a black painted oval with a straight stick (you have already met them in the lessons). For the development
        of measured and rhythmic playing, counting out loud is often used. Half notes sound twice as long as quarter notes (quite logical, isn't it?).
        Half notes are represented by an empty oval with a stick. Two half notes (or four quarter notes) form a whole note, which is represented by an
        empty oval without a stick. This note requires four quarter counts.`,
        text3: `Often in music there are also shorter sounds that are recorded by the eighth, sixteenth, thirty-second and so on notes. Eighth notes
        are performed 2 times faster than quarter notes and are pictured as a black oval with a tail added to the stick. Several eighths that are nearby
        are usually connected by a common horizontal line.`,
        text4: `The sixteenth notes are played twice as fast as the eighth, and the thirty-second notes are played twice as fast as the sixteenth. They
        are written with two and three tails, respectively, and can be connected by a horizontal line according to the same rules as the eighth.`,
        text5: `When passing the practice, always try to take into account the material you have passed! Remember that eighth notes should be played twice
        as fast as quarter notes!`,
        img1: '../images/Lesson61.jpg',
        img2: '../images/Lesson62.jpg',
        img3: '../images/Lesson63.jpg',
        notes: ['C1', 'A', 'E', 'D', 'C1', 'D1', 'A', 'E', 'D'],
        practiceImage: '../images/Lesson6Practice.jpg',
    },
    {
        id: 7,
        subtitle: 'Lenghtening. Rests',
        title: 'Lengthening and Rests',
        text1: `Well, have you figured out what this song is yet? If not, then after this lesson you will definitely understand! Here you will analyze a
        small part of the last topic and get acquainted with the rests. And don't forget to remember, because a test is waiting for you soon!`,
        text2: `So, there are two ways to increase the duration of the sound. Here is the first one: if two adjacent notes of the same height are connected
        by a small arc (tie), then the second sound is not played on the instrument, but only delayed. Of the two sounds, one is formed, the duration of which
        is equal to the sum of the durations of the first and second sounds.`,
        text3: `The second method is that the dot to the right of the note lengthens this note by half its duration. That is, a half note with a dot will last
        as a half + quarter note. And, for example, a whole note with a dot will last as a whole + half. Elementary!`,
        text4: `A rest is a sign indicating a break in the sound. A rest — a temporary silence in music — is one of the means of expression. The duration of rests
        is measured in the same way as the duration of sounds (pay attention to the picture).`,
        text5: `When counting aloud, the pauses should be calculated in the same way as the notes of the corresponding duration. The dots near the pauses have
        the same meaning as the dots near the notes.`,
        img1: '../images/Lesson71.jpg',
        img2: '../images/Lesson72.jpg',
        img3: '../images/Lesson73.jpg',
        notes: ['E1', 'E1', 'E1', 'E1', 'E1', 'E1', 'D1', 'D1', 'D1', 'D1', 'D1', 'C1', 'B', 'A', 'D1', 'D1', 'C1', 'C1', 'B', 'A', 'A', 'D1', 'D1', 'C1', 'B', 'A'],
        practiceImage: '../images/Lesson7Practice.jpg',
    },
    {
        id: 8,
        subtitle: 'Bars',
        title: 'Bars',
        text1: `♫... sippin' on that Henn', I know you love that Bacardi ...♫ oh, are you here already? You're doing great, this is my favorite song! Ahem, okay, never
        mind. Let's go study what bars are! *A little friendly reminder about the TEST that awaits you already IN THE NEXT LESSON!!!*`,
        text2: `Musical works are divided into short, equal in the sum of the durations contained in them, segments called bars. In musical notation, the bars are separated
        from each other by vertically placed clock lines (you saw this in previous practice). In music we meet alternations of strong and weak parts. The stress falls on
        a strong part of the beat, that is, on its first sound. The bar combines a certain number of strong and weak parts.`,
        text3: `The time signature is set at the beginning of the musical string after the clef and clef alteration signs and is indicated by a fraction, the numerator of
        which indicates which counting is in this work, and the denominator — what duration is taken as a unit of counting.`,
        text4: `So, for example, if the song size is 2/4, it means: firstly, that there are two parts (strong and weak) in the beat here, and secondly, that the unit of counting
        here is a quarter. Therefore, the counting here should go: one, a, two, a, three, a, four, a.`,
        text5: ``,
        img1: '../images/Lesson81.jpg',
        img2: '../images/Lesson82.jpg',
        img3: '../images/Lesson83.jpg',
        notes: [],
        practiceImage: '../images/Lesson8Practice.jpg',
    },
    {
        id: 9,
        subtitle: 'Consolidation 2',
        title: 'Consolidation 2',
        text1: `Well, this moment has finally come... You have finished studying the second global topic — rhythm and duration! And this means that now you have a TEST waiting for you.
        But don't worry, I won't let you fail it, so now we'll quickly repeat the main points of the topic. Good luck!`,
        text2: `A quarter note is taken as a unit of counting, which is indicated by a black oval with a stick. The half note is twice as large as the quarter note and is indicated by
        an empty oval with a stick. A whole note is twice as large as a half note and is indicated by an empty oval. The eighth note is twice as short as the fourth and is indicated
        by a black oval with a stick and a tail. The sixteenth notes are played twice as fast as the eighth. You can see how the notes are designated in the picture above.`,
        text3: `There are two ways to lengthen notes — a dot on the right (1.5 times) and a tie (the sum of two notes). Rests have the same names and durations as notes and can be
        lengthened by a dot according to the same scheme. You can see the symbols of the rests in the picture.`,
        text4: `Bars are short intervals of a piece of music of the same duration. They are separated from each other using barlines. The time signature is set indicated by a fraction,
        the numerator of which indicates which counting is in this work, and the denominator — what duration is taken as a unit of counting.`,
        text5: ``,
        img1: '../images/Lesson62.jpg',
        img2: '../images/Lesson73.jpg',
        img3: '../images/Lesson83.jpg',
        notes: [],
        practiceImage: '',
    },
]