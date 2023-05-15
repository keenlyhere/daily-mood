"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
    options.schema = process.env.SCHEMA; // define your schema in options object
}

options.tableName = "DayEntries";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */

        return queryInterface.bulkInsert(
            options,
            [
                {
                    userId: 1,
                    day: "2023-02-18",
                    entryType: "dayMood",
                    entryData: "Meh",
                },
                {
                    userId: 1,
                    day: "2023-02-18",
                    entryType: "dayImage",
                    entryData:
                        "https://images.pexels.com/photos/3910073/pexels-photo-3910073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                },
                {
                    userId: 1,
                    day: "2023-02-18",
                    entryType: "dayJournal",
                    entryData: "I didn't have the greatest day today, but it wasn't completely bad!",
                },
                {
                    userId: 1,
                    day: "2023-02-19",
                    entryType: "dayMood",
                    entryData: "Sad",
                },
                {
                    userId: 1,
                    day: "2023-02-19",
                    entryType: "dayImage",
                    entryData:
                        "https://images.pexels.com/photos/2228580/pexels-photo-2228580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                },
                {
                    userId: 1,
                    day: "2023-02-19",
                    entryType: "dayJournal",
                    entryData: "Today was terrible for me. Nothing was going right. Hopefully tomorrow will be better.",
                },
                {
                    userId: 1,
                    day: "2023-02-20",
                    entryType: "dayMood",
                    entryData: "Ecstatic",
                },
                {
                    userId: 1,
                    day: "2023-02-20",
                    entryType: "dayImage",
                    entryData:
                        "https://images.pexels.com/photos/4301252/pexels-photo-4301252.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                },
                {
                    userId: 1,
                    day: "2023-02-20",
                    entryType: "dayJournal",
                    entryData:
                        "I feel so much better today! I finally got a chance to take my camera outside to explore nature and capture the beauty of it.",
                },
                {
                    userId: 2,
                    day: "2023-02-21",
                    entryType: "dayMood",
                    entryData: "Ecstatic",
                },
                {
                    userId: 2,
                    day: "2023-02-21",
                    entryType: "dayImage",
                    entryData: "https://keenlychung.com/images/amy_ace.png",
                },
                {
                    userId: 2,
                    day: "2023-02-21",
                    entryType: "dayJournal",
                    entryData: "I got another ace while playing comp today! GGEZ.",
                },
                {
                    userId: 1,
                    day: "2023-01-03",
                    entryType: "dayJournal",
                    entryData:
                        "Today was a pretty uneventful day. I went to school and then came home and did my homework.",
                },
                {
                    userId: 1,
                    day: "2023-01-04",
                    entryType: "dayJournal",
                    entryData:
                        "Today I got into an argument with Bart about whether or not aliens exist. I think they do, but he thinks they don't. We agreed to disagree.",
                },
                {
                    userId: 1,
                    day: "2023-01-05",
                    entryType: "dayJournal",
                    entryData:
                        "I had a nightmare last night about being trapped in a giant spider web. It was pretty scary, but thankfully it wasn't real.",
                },
                {
                    userId: 1,
                    day: "2023-01-06",
                    entryType: "dayJournal",
                    entryData:
                        "I tried out for the school play today. I really hope I get a part, but I'm not sure I'm good enough.",
                },
                {
                    userId: 1,
                    day: "2023-01-07",
                    entryType: "dayJournal",
                    entryData:
                        "I spent most of the day hanging out with Bart and playing video games. It was a lot of fun.",
                },
                {
                    userId: 1,
                    day: "2023-01-08",
                    entryType: "dayJournal",
                    entryData:
                        "I went to the library and checked out a bunch of books about space. I'm really interested in learning more about the universe.",
                },
                {
                    userId: 1,
                    day: "2023-01-09",
                    entryType: "dayJournal",
                    entryData:
                        "Today I went to the park and played basketball with some friends. It was a lot of fun, but I'm not very good at it.",
                },
                {
                    userId: 1,
                    day: "2023-01-10",
                    entryType: "dayJournal",
                    entryData:
                        "I had a really good day at school today. I got an A on my math test and my teacher said she was proud of me.",
                },
                {
                    userId: 1,
                    day: "2023-01-11",
                    entryType: "dayJournal",
                    entryData:
                        "I watched a really interesting documentary about the history of computers today. I learned a lot of cool stuff.",
                },
                {
                    userId: 1,
                    day: "2023-01-12",
                    entryType: "dayJournal",
                    entryData:
                        "I spent most of the day working on a science project for school. It was really challenging, but I think I did a good job.",
                },
                {
                    userId: 1,
                    day: "2023-01-13",
                    entryType: "dayJournal",
                    entryData:
                        "I went to the arcade with Bart today and we played a bunch of different games. I won a stuffed animal from one of the claw machines!",
                },
                {
                    userId: 1,
                    day: "2023-01-14",
                    entryType: "dayJournal",
                    entryData:
                        "I went to the movies with my parents today and saw a really funny comedy. We all laughed a lot.",
                },
                {
                    userId: 1,
                    day: "2023-01-03",
                    entryType: "dayMood",
                    entryData: "Meh",
                },
                {
                    userId: 1,
                    day: "2023-01-04",
                    entryType: "dayMood",
                    entryData: "Sad",
                },
                {
                    userId: 1,
                    day: "2023-01-05",
                    entryType: "dayMood",
                    entryData: "Ecstatic",
                },
                {
                    userId: 1,
                    day: "2023-01-06",
                    entryType: "dayMood",
                    entryData: "Happy",
                },
                {
                    userId: 1,
                    day: "2023-01-07",
                    entryType: "dayMood",
                    entryData: "Content",
                },
                {
                    userId: 1,
                    day: "2023-01-08",
                    entryType: "dayMood",
                    entryData: "Sad",
                },
                {
                    userId: 1,
                    day: "2023-01-09",
                    entryType: "dayMood",
                    entryData: "Meh",
                },
                {
                    userId: 1,
                    day: "2023-01-10",
                    entryType: "dayMood",
                    entryData: "Happy",
                },
                {
                    userId: 1,
                    day: "2023-01-11",
                    entryType: "dayMood",
                    entryData: "Ecstatic",
                },
                {
                    userId: 1,
                    day: "2023-01-12",
                    entryType: "dayMood",
                    entryData: "Content",
                },
                {
                    userId: 1,
                    day: "2023-01-13",
                    entryType: "dayMood",
                    entryData: "Meh",
                },
                {
                    userId: 1,
                    day: "2023-01-14",
                    entryType: "dayMood",
                    entryData: "Sad",
                },
                {
                    userId: 1,
                    day: "2023-01-15",
                    entryType: "dayMood",
                    entryData: "Happy",
                },

                {
                    userId: 1,
                    day: "2023-01-03",
                    entryType: "dayImage",
                    entryData: "https://frinkiac.com/img/S03E05/97219.jpg",
                },
                {
                    userId: 1,
                    day: "2023-01-04",
                    entryType: "dayImage",
                    entryData: "https://frinkiac.com/img/S02E21/902874.jpg",
                },
                {
                    userId: 1,
                    day: "2023-01-05",
                    entryType: "dayImage",
                    entryData: "https://frinkiac.com/img/S09E14/480529.jpg",
                },
                {
                    userId: 1,
                    day: "2023-01-06",
                    entryType: "dayImage",
                    entryData: "https://frinkiac.com/img/S02E20/1098424.jpg",
                },
                {
                    userId: 1,
                    day: "2023-01-07",
                    entryType: "dayImage",
                    entryData: "https://frinkiac.com/img/S02E21/1198953.jpg",
                },
                {
                    userId: 1,
                    day: "2023-01-08",
                    entryType: "dayImage",
                    entryData: "https://frinkiac.com/img/S02E01/527300.jpg",
                },
                {
                    userId: 1,
                    day: "2023-01-09",
                    entryType: "dayImage",
                    entryData: "https://frinkiac.com/img/S13E11/1279361.jpg",
                },
                {
                    userId: 1,
                    day: "2023-01-10",
                    entryType: "dayImage",
                    entryData: "https://frinkiac.com/img/S02E01/277250.jpg",
                },
                {
                    userId: 1,
                    day: "2023-01-11",
                    entryType: "dayImage",
                    entryData: "https://frinkiac.com/img/S05E03/1015563.jpg",
                },
                {
                    userId: 1,
                    day: "2023-01-12",
                    entryType: "dayImage",
                    entryData: "https://frinkiac.com/img/S06E14/36385.jpg",
                },
                {
                    userId: 1,
                    day: "2023-01-13",
                    entryType: "dayImage",
                    entryData: "https://frinkiac.com/img/S14E10/890014.jpg",
                },
                {
                    userId: 1,
                    day: "2023-01-14",
                    entryType: "dayImage",
                    entryData: "https://frinkiac.com/img/S02E12/66434.jpg",
                },
                {
                    userId: 1,
                    day: "2023-02-03",
                    entryType: "dayJournal",
                    entryData: "Today was a great day! I finally beat Bart in a game of basketball.",
                },
                {
                    userId: 1,
                    day: "2023-02-04",
                    entryType: "dayJournal",
                    entryData: "Spent the day reading comic books with Bart. It was a lot of fun!",
                },
                {
                    userId: 1,
                    day: "2023-02-05",
                    entryType: "dayJournal",
                    entryData:
                        "Feeling a bit down today. I miss my best friend Lisa. Can't wait until she's back from her trip.",
                },
                {
                    userId: 1,
                    day: "2023-02-06",
                    entryType: "dayJournal",
                    entryData:
                        "Had a nightmare last night about the zombie apocalypse. Need to stop watching scary movies before bed.",
                },
                {
                    userId: 1,
                    day: "2023-02-07",
                    entryType: "dayJournal",
                    entryData:
                        "Went to the arcade with Bart and Nelson. Spent way too much money, but it was worth it!",
                },
                {
                    userId: 1,
                    day: "2023-02-08",
                    entryType: "dayJournal",
                    entryData: "Missed the bus this morning and was late for school. Ugh, Mondays...",
                },
                {
                    userId: 1,
                    day: "2023-02-09",
                    entryType: "dayJournal",
                    entryData: "Got an A on my math test! Maybe I'm not so bad at math after all.",
                },
                {
                    userId: 1,
                    day: "2023-02-10",
                    entryType: "dayJournal",
                    entryData:
                        "Watched a scary movie with Bart and ended up sleeping with the light on. I'm such a wimp!",
                },
                {
                    userId: 1,
                    day: "2023-02-11",
                    entryType: "dayJournal",
                    entryData:
                        "Played video games with Bart all day. I need to remember to get some fresh air tomorrow.",
                },
                {
                    userId: 1,
                    day: "2023-02-12",
                    entryType: "dayJournal",
                    entryData:
                        "Went to the park with my parents today. It was nice to spend some quality time with them.",
                },
                {
                    userId: 1,
                    day: "2023-02-13",
                    entryType: "dayJournal",
                    entryData:
                        "Had a sleepover with Bart and Ralph. Stayed up way too late playing pranks on each other.",
                },
                {
                    userId: 1,
                    day: "2023-02-14",
                    entryType: "dayJournal",
                    entryData:
                        "Valentine's Day is dumb. But I did give a card to Lisa before she left on her trip. I hope she likes it.",
                },
                {
                    userId: 1,
                    day: "2023-02-15",
                    entryType: "dayJournal",
                    entryData:
                        "Had a science project due today. Bart and I stayed up all night working on it. I'm exhausted!",
                },

                {
                    userId: 1,
                    day: "2023-02-03",
                    entryType: "dayMood",
                    entryData: "Ecstatic",
                },
                {
                    userId: 1,
                    day: "2023-02-04",
                    entryType: "dayMood",
                    entryData: "Happy",
                },
                {
                    userId: 1,
                    day: "2023-02-05",
                    entryType: "dayMood",
                    entryData: "Content",
                },
                {
                    userId: 1,
                    day: "2023-02-06",
                    entryType: "dayMood",
                    entryData: "Meh",
                },
                {
                    userId: 1,
                    day: "2023-02-07",
                    entryType: "dayMood",
                    entryData: "Sad",
                },
                {
                    userId: 1,
                    day: "2023-02-08",
                    entryType: "dayMood",
                    entryData: "Ecstatic",
                },
                {
                    userId: 1,
                    day: "2023-02-09",
                    entryType: "dayMood",
                    entryData: "Happy",
                },
                {
                    userId: 1,
                    day: "2023-02-10",
                    entryType: "dayMood",
                    entryData: "Content",
                },
                {
                    userId: 1,
                    day: "2023-02-11",
                    entryType: "dayMood",
                    entryData: "Meh",
                },
                {
                    userId: 1,
                    day: "2023-02-12",
                    entryType: "dayMood",
                    entryData: "Sad",
                },
                {
                    userId: 1,
                    day: "2023-02-13",
                    entryType: "dayMood",
                    entryData: "Ecstatic",
                },
                {
                    userId: 1,
                    day: "2023-02-14",
                    entryType: "dayMood",
                    entryData: "Happy",
                },
                {
                    userId: 1,
                    day: "2023-02-15",
                    entryType: "dayMood",
                    entryData: "Content",
                },
                {
                    userId: 1,
                    day: "2023-02-16",
                    entryType: "dayMood",
                    entryData: "Meh",
                },
                {
                    userId: 1,
                    day: "2023-02-17",
                    entryType: "dayMood",
                    entryData: "Sad",
                },

                {
                    userId: 1,
                    day: "2023-02-03",
                    entryType: "dayImage",
                    entryData: "https://frinkiac.com/img/S13E11/1278736.jpg",
                },
                {
                    userId: 1,
                    day: "2023-02-04",
                    entryType: "dayImage",
                    entryData: "https://frinkiac.com/img/S03E23/506960.jpg",
                },
                {
                    userId: 1,
                    day: "2023-02-05",
                    entryType: "dayImage",
                    entryData:
                        "https://frinkiac.com/img/S02E21/1215770.jpg",
                },
                {
                    userId: 1,
                    day: "2023-02-06",
                    entryType: "dayImage",
                    entryData:
                        "https://frinkiac.com/img/S14E01/900441.jpg",
                },
                {
                    userId: 1,
                    day: "2023-02-07",
                    entryType: "dayImage",
                    entryData:
                        "https://frinkiac.com/img/S02E01/921898.jpg",
                },
                {
                    userId: 1,
                    day: "2023-02-08",
                    entryType: "dayImage",
                    entryData: "https://frinkiac.com/img/S02E08/817634.jpg",
                },
                {
                    userId: 1,
                    day: "2023-02-09",
                    entryType: "dayImage",
                    entryData: "https://frinkiac.com/img/S02E01/436009.jpg",
                },
                {
                    userId: 1,
                    day: "2023-02-10",
                    entryType: "dayImage",
                    entryData:
                        "https://frinkiac.com/img/S08E05/339938.jpg",
                },
                {
                    userId: 1,
                    day: "2023-02-11",
                    entryType: "dayImage",
                    entryData:
                        "https://frinkiac.com/img/S01E02/204215.jpg",
                },
                {
                    userId: 1,
                    day: "2023-02-12",
                    entryType: "dayImage",
                    entryData:
                        "https://frinkiac.com/img/S03E04/930123.jpg",
                },
                {
                    userId: 1,
                    day: "2023-02-13",
                    entryType: "dayImage",
                    entryData:
                        "https://frinkiac.com/img/S05E09/60376.jpg",
                },
                {
                    userId: 1,
                    day: "2023-02-14",
                    entryType: "dayImage",
                    entryData:
                        "https://frinkiac.com/img/S12E11/740907.jpg",
                },
                {
                    userId: 1,
                    day: "2023-02-15",
                    entryType: "dayImage",
                    entryData:
                        "https://frinkiac.com/img/S03E05/97837.jpg",
                },
                {
                    userId: 1,
                    day: "2023-05-15",
                    entryType: "dayMood",
                    entryData: "Meh",
                },
                {
                    userId: 1,
                    day: "2023-05-15",
                    entryType: "dayImage",
                    entryData:
                        "https://images.pexels.com/photos/3910073/pexels-photo-3910073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                },
                {
                    userId: 1,
                    day: "2023-05-15",
                    entryType: "dayJournal",
                    entryData: "I didn't have the greatest day today, but it wasn't completely bad.",
                },
                {
                    userId: 1,
                    day: "2023-05-14",
                    entryType: "dayMood",
                    entryData: "Sad",
                },
                {
                    userId: 1,
                    day: "2023-05-14",
                    entryType: "dayImage",
                    entryData:
                        "https://images.pexels.com/photos/2228580/pexels-photo-2228580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                },
                {
                    userId: 1,
                    day: "2023-05-14",
                    entryType: "dayJournal",
                    entryData: "Today was terrible for me. Nothing was going right. Hopefully tomorrow will be better.",
                },
                {
                    userId: 1,
                    day: "2023-05-13",
                    entryType: "dayMood",
                    entryData: "Ecstatic",
                },
                {
                    userId: 1,
                    day: "2023-05-13",
                    entryType: "dayImage",
                    entryData:
                        "https://images.pexels.com/photos/4301252/pexels-photo-4301252.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                },
                {
                    userId: 1,
                    day: "2023-05-13",
                    entryType: "dayJournal",
                    entryData:
                        "I feel so much better today! I finally got a chance to take my camera outside to explore nature and capture the beauty of it.",
                },
                {
                    userId: 2,
                    day: "2023-05-12",
                    entryType: "dayMood",
                    entryData: "Ecstatic",
                },
                {
                    userId: 2,
                    day: "2023-05-12",
                    entryType: "dayImage",
                    entryData: "https://keenlychung.com/images/amy_ace.png",
                },
                {
                    userId: 2,
                    day: "2023-05-12",
                    entryType: "dayJournal",
                    entryData: "I got another ace while playing comp today! GGEZ.",
                },
                {
                    userId: 1,
                    day: "2023-04-03",
                    entryType: "dayJournal",
                    entryData:
                        "Today was a pretty uneventful day. I went to school and then came home and did my homework.",
                },
                {
                    userId: 1,
                    day: "2023-04-04",
                    entryType: "dayJournal",
                    entryData:
                        "Today I got into an argument with Bart about whether or not aliens exist. I think they do, but he thinks they don't. We agreed to disagree.",
                },
                {
                    userId: 1,
                    day: "2023-04-05",
                    entryType: "dayJournal",
                    entryData:
                        "I had a nightmare last night about being trapped in a giant spider web. It was pretty scary, but thankfully it wasn't real.",
                },
                {
                    userId: 1,
                    day: "2023-04-06",
                    entryType: "dayJournal",
                    entryData:
                        "I tried out for the school play today. I really hope I get a part, but I'm not sure I'm good enough.",
                },
                {
                    userId: 1,
                    day: "2023-04-07",
                    entryType: "dayJournal",
                    entryData:
                        "I spent most of the day hanging out with Bart and playing video games. It was a lot of fun.",
                },
                {
                    userId: 1,
                    day: "2023-04-08",
                    entryType: "dayJournal",
                    entryData:
                        "I went to the library and checked out a bunch of books about space. I'm really interested in learning more about the universe.",
                },
                {
                    userId: 1,
                    day: "2023-04-09",
                    entryType: "dayJournal",
                    entryData:
                        "Today I went to the park and played basketball with some friends. It was a lot of fun, but I'm not very good at it.",
                },
                {
                    userId: 1,
                    day: "2023-04-10",
                    entryType: "dayJournal",
                    entryData:
                        "I had a really good day at school today. I got an A on my math test and my teacher said she was proud of me.",
                },
                {
                    userId: 1,
                    day: "2023-04-11",
                    entryType: "dayJournal",
                    entryData:
                        "I watched a really interesting documentary about the history of computers today. I learned a lot of cool stuff.",
                },
                {
                    userId: 1,
                    day: "2023-04-12",
                    entryType: "dayJournal",
                    entryData:
                        "I spent most of the day working on a science project for school. It was really challenging, but I think I did a good job.",
                },
                {
                    userId: 1,
                    day: "2023-04-13",
                    entryType: "dayJournal",
                    entryData:
                        "I went to the arcade with Bart today and we played a bunch of different games. I won a stuffed animal from one of the claw machines!",
                },
                {
                    userId: 1,
                    day: "2023-04-14",
                    entryType: "dayJournal",
                    entryData:
                        "I went to the movies with my parents today and saw a really funny comedy. We all laughed a lot.",
                },
                {
                    userId: 1,
                    day: "2023-04-03",
                    entryType: "dayMood",
                    entryData: "Meh",
                },
                {
                    userId: 1,
                    day: "2023-04-04",
                    entryType: "dayMood",
                    entryData: "Sad",
                },
                {
                    userId: 1,
                    day: "2023-04-05",
                    entryType: "dayMood",
                    entryData: "Ecstatic",
                },
                {
                    userId: 1,
                    day: "2023-04-06",
                    entryType: "dayMood",
                    entryData: "Happy",
                },
                {
                    userId: 1,
                    day: "2023-04-07",
                    entryType: "dayMood",
                    entryData: "Content",
                },
                {
                    userId: 1,
                    day: "2023-04-08",
                    entryType: "dayMood",
                    entryData: "Sad",
                },
                {
                    userId: 1,
                    day: "2023-04-09",
                    entryType: "dayMood",
                    entryData: "Meh",
                },
                {
                    userId: 1,
                    day: "2023-04-10",
                    entryType: "dayMood",
                    entryData: "Happy",
                },
                {
                    userId: 1,
                    day: "2023-04-11",
                    entryType: "dayMood",
                    entryData: "Ecstatic",
                },
                {
                    userId: 1,
                    day: "2023-04-12",
                    entryType: "dayMood",
                    entryData: "Content",
                },
                {
                    userId: 1,
                    day: "2023-04-13",
                    entryType: "dayMood",
                    entryData: "Meh",
                },
                {
                    userId: 1,
                    day: "2023-04-14",
                    entryType: "dayMood",
                    entryData: "Sad",
                },
                {
                    userId: 1,
                    day: "2023-04-15",
                    entryType: "dayMood",
                    entryData: "Happy",
                },

                {
                    userId: 1,
                    day: "2023-04-03",
                    entryType: "dayImage",
                    entryData: "https://frinkiac.com/img/S03E05/97219.jpg",
                },
                {
                    userId: 1,
                    day: "2023-04-04",
                    entryType: "dayImage",
                    entryData: "https://frinkiac.com/img/S02E21/902874.jpg",
                },
                {
                    userId: 1,
                    day: "2023-04-05",
                    entryType: "dayImage",
                    entryData: "https://frinkiac.com/img/S09E14/480529.jpg",
                },
                {
                    userId: 1,
                    day: "2023-04-06",
                    entryType: "dayImage",
                    entryData: "https://frinkiac.com/img/S02E20/1098424.jpg",
                },
                {
                    userId: 1,
                    day: "2023-04-07",
                    entryType: "dayImage",
                    entryData: "https://frinkiac.com/img/S02E21/1198953.jpg",
                },
                {
                    userId: 1,
                    day: "2023-04-08",
                    entryType: "dayImage",
                    entryData: "https://frinkiac.com/img/S02E01/527300.jpg",
                },
                {
                    userId: 1,
                    day: "2023-04-09",
                    entryType: "dayImage",
                    entryData: "https://frinkiac.com/img/S13E11/1279361.jpg",
                },
                {
                    userId: 1,
                    day: "2023-04-10",
                    entryType: "dayImage",
                    entryData: "https://frinkiac.com/img/S02E01/277250.jpg",
                },
                {
                    userId: 1,
                    day: "2023-04-11",
                    entryType: "dayImage",
                    entryData: "https://frinkiac.com/img/S05E03/1015563.jpg",
                },
                {
                    userId: 1,
                    day: "2023-04-12",
                    entryType: "dayImage",
                    entryData: "https://frinkiac.com/img/S06E14/36385.jpg",
                },
                {
                    userId: 1,
                    day: "2023-04-13",
                    entryType: "dayImage",
                    entryData: "https://frinkiac.com/img/S14E10/890014.jpg",
                },
                {
                    userId: 1,
                    day: "2023-04-14",
                    entryType: "dayImage",
                    entryData: "https://frinkiac.com/img/S02E12/66434.jpg",
                },
                {
                    userId: 1,
                    day: "2023-05-03",
                    entryType: "dayJournal",
                    entryData: "Today was a great day! I finally beat Bart in a game of basketball.",
                },
                {
                    userId: 1,
                    day: "2023-05-04",
                    entryType: "dayJournal",
                    entryData: "Spent the day reading comic books with Bart. It was a lot of fun!",
                },
                {
                    userId: 1,
                    day: "2023-05-05",
                    entryType: "dayJournal",
                    entryData:
                        "Feeling a bit down today. I miss my best friend Lisa. Can't wait until she's back from her trip.",
                },
                {
                    userId: 1,
                    day: "2023-05-06",
                    entryType: "dayJournal",
                    entryData:
                        "Had a nightmare last night about the zombie apocalypse. Need to stop watching scary movies before bed.",
                },
                {
                    userId: 1,
                    day: "2023-05-07",
                    entryType: "dayJournal",
                    entryData:
                        "Went to the arcade with Bart and Nelson. Spent way too much money, but it was worth it!",
                },
                {
                    userId: 1,
                    day: "2023-05-08",
                    entryType: "dayJournal",
                    entryData: "Missed the bus this morning and was late for school. Ugh, Mondays...",
                },
                {
                    userId: 1,
                    day: "2023-05-09",
                    entryType: "dayJournal",
                    entryData: "Got an A on my math test! Maybe I'm not so bad at math after all.",
                },
                {
                    userId: 1,
                    day: "2023-05-10",
                    entryType: "dayJournal",
                    entryData:
                        "Watched a scary movie with Bart and ended up sleeping with the light on. I'm such a wimp!",
                },
                {
                    userId: 1,
                    day: "2023-05-11",
                    entryType: "dayJournal",
                    entryData:
                        "Played video games with Bart all day. I need to remember to get some fresh air tomorrow.",
                },
                {
                    userId: 1,
                    day: "2023-05-12",
                    entryType: "dayJournal",
                    entryData:
                        "Went to the park with my parents today. It was nice to spend some quality time with them.",
                },
                {
                    userId: 1,
                    day: "2023-05-13",
                    entryType: "dayJournal",
                    entryData:
                        "Had a sleepover with Bart and Ralph. Stayed up way too late playing pranks on each other.",
                },
                {
                    userId: 1,
                    day: "2023-05-14",
                    entryType: "dayJournal",
                    entryData:
                        "Valentine's Day is dumb. But I did give a card to Lisa before she left on her trip. I hope she likes it.",
                },
                {
                    userId: 1,
                    day: "2023-05-15",
                    entryType: "dayJournal",
                    entryData:
                        "Had a science project due today. Bart and I stayed up all night working on it. I'm exhausted!",
                },

                {
                    userId: 1,
                    day: "2023-05-03",
                    entryType: "dayMood",
                    entryData: "Ecstatic",
                },
                {
                    userId: 1,
                    day: "2023-05-04",
                    entryType: "dayMood",
                    entryData: "Happy",
                },
                {
                    userId: 1,
                    day: "2023-05-05",
                    entryType: "dayMood",
                    entryData: "Content",
                },
                {
                    userId: 1,
                    day: "2023-05-06",
                    entryType: "dayMood",
                    entryData: "Meh",
                },
                {
                    userId: 1,
                    day: "2023-05-07",
                    entryType: "dayMood",
                    entryData: "Sad",
                },
                {
                    userId: 1,
                    day: "2023-05-08",
                    entryType: "dayMood",
                    entryData: "Ecstatic",
                },
                {
                    userId: 1,
                    day: "2023-05-09",
                    entryType: "dayMood",
                    entryData: "Happy",
                },
                {
                    userId: 1,
                    day: "2023-05-10",
                    entryType: "dayMood",
                    entryData: "Content",
                },
                {
                    userId: 1,
                    day: "2023-05-11",
                    entryType: "dayMood",
                    entryData: "Meh",
                },
                {
                    userId: 1,
                    day: "2023-05-12",
                    entryType: "dayMood",
                    entryData: "Sad",
                },
                {
                    userId: 1,
                    day: "2023-05-13",
                    entryType: "dayMood",
                    entryData: "Ecstatic",
                },
                {
                    userId: 1,
                    day: "2023-05-14",
                    entryType: "dayMood",
                    entryData: "Happy",
                },
                {
                    userId: 1,
                    day: "2023-05-15",
                    entryType: "dayMood",
                    entryData: "Content",
                },
                {
                    userId: 1,
                    day: "2023-05-03",
                    entryType: "dayImage",
                    entryData: "https://frinkiac.com/img/S13E11/1278736.jpg",
                },
                {
                    userId: 1,
                    day: "2023-05-04",
                    entryType: "dayImage",
                    entryData: "https://frinkiac.com/img/S03E23/506960.jpg",
                },
                {
                    userId: 1,
                    day: "2023-05-05",
                    entryType: "dayImage",
                    entryData:
                        "https://frinkiac.com/img/S02E21/1215770.jpg",
                },
                {
                    userId: 1,
                    day: "2023-05-06",
                    entryType: "dayImage",
                    entryData:
                        "https://frinkiac.com/img/S14E01/900441.jpg",
                },
                {
                    userId: 1,
                    day: "2023-05-07",
                    entryType: "dayImage",
                    entryData:
                        "https://frinkiac.com/img/S02E01/921898.jpg",
                },
                {
                    userId: 1,
                    day: "2023-05-08",
                    entryType: "dayImage",
                    entryData: "https://frinkiac.com/img/S02E08/817634.jpg",
                },
                {
                    userId: 1,
                    day: "2023-05-09",
                    entryType: "dayImage",
                    entryData: "https://frinkiac.com/img/S02E01/436009.jpg",
                },
                {
                    userId: 1,
                    day: "2023-05-10",
                    entryType: "dayImage",
                    entryData:
                        "https://frinkiac.com/img/S08E05/339938.jpg",
                },
                {
                    userId: 1,
                    day: "2023-05-11",
                    entryType: "dayImage",
                    entryData:
                        "https://frinkiac.com/img/S01E02/204215.jpg",
                },
                {
                    userId: 1,
                    day: "2023-05-12",
                    entryType: "dayImage",
                    entryData:
                        "https://frinkiac.com/img/S03E04/930123.jpg",
                },
                {
                    userId: 1,
                    day: "2023-05-13",
                    entryType: "dayImage",
                    entryData:
                        "https://frinkiac.com/img/S05E09/60376.jpg",
                },
                {
                    userId: 1,
                    day: "2023-05-14",
                    entryType: "dayImage",
                    entryData:
                        "https://frinkiac.com/img/S12E11/740907.jpg",
                },
                {
                    userId: 1,
                    day: "2023-05-15",
                    entryType: "dayImage",
                    entryData:
                        "https://frinkiac.com/img/S03E05/97837.jpg",
                },

            ],
            {}
        );
        // .then(() => {
        //   console.log('Pet seed data inserted successfully!');
        // })
        // .catch(error => {
        //   console.error(error);
        // });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */

        return queryInterface.bulkDelete(options, {}, {});
    },
};
