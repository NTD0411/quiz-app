import { PART2_3_20 } from './part2-all.mjs';
import { PART1_FIXES } from './part1-fixes.mjs';

function q(text, a, b, c, d) {
  return { text, options: { A: a, B: b, C: c, D: d } };
}

function signQ(sign, a, b, c, d) {
  return { text: 'What does it say? Choose the correct explanation.', sign, options: { A: a, B: b, C: c, D: d } };
}

// PART 2 data for all 20 tests (from official exam document)
const PART2 = {
  1: {
    11: signQ(`Paula\nDo you want to go to the concert with James tonight? Ring him before six to tell him. He'll go with someone else if he doesn't hear from you by then.\nTim`, `Paula won't be able to go to the concert unless she phones James by six.`, `James wants Paula to find someone to go to the concert with him.`, `James can no longer go to the concert with Paula at six.`, `Jan can't go to the concert with Paula.`),
    12: signQ(`To: All students\nFrom: College Secretary\nCan I remind you that all essays are due to this Friday? No late work will be accepted unless accompanied by a doctor's letter`, `The college secretary will post students their essays on Friday`, `Students may hand in their essays after Friday if they can prove illness.`, `Unless your essay is due by Friday, you do not need to reply.`, `If your essay is by Friday, you have to reply.`),
    13: signQ(`Chris\nI've written this letter to Sam but I can't find his address. Have you got it? If not can you ring Mum and ask her? Then please post it.\nSarah`, `Chris should phone Sam if he doesn't know the address.`, `Send the letter when she has found out the address.`, `Ask Mum to write the address and then send the letter.`, `write a letter to Sam.`),
    14: signQ(`This office can only take bookings at least twenty four hours in advance of departure`, `This office doesn't take bookings for the same day as you travel.`, `If you book tickets here you will receive them a day later.`, `You can book tickets at this office twenty four hours a day.`, `Unless you books tickets here, you will receive them a day later.`),
    15: signQ(`The gym is closed\n3-5 p.m. Friday\nfor staff training`, `The public can use the gym for part of Friday.`, `The gym is closed for one day.`, `No staff are available on Friday after 5 p.m.`, `The gym is closed every day.`)
  },
  2: {
    11: signQ(`Debbie,\nBrian's decided to attend the advanced guitar class and not the intermediate, and hopes you will too. Please let him know. It starts immediately after the immediate class.\nVickie`, `Debbie should tell Brian the exact time his guitar class starts.`, `Brian wants Debbie to go to the same guitar class as him.`, `Brian is asking to join the advanced guitar class.`, `Debbie should go to advanced class.`),
    12: signQ(`Children's Science Exhibition\nMachines have buttons which should be pressed to make them start.`, `The machines are designed so that children can operate them.`, `Children should be careful not to touch the machines.`, `The machines are models which do not work.`, `Children should not be careful with the machines.`),
    13: signQ(`SPORTS CENTER\nPLEASE REPORT LOST PROPERTY IMMEDIATELY TO ANY MEMBER OF STAFF`, `Ask a member of staff to show you the lost property list.`, `Tell the staff what you have lost without delay.`, `The staff will fill in a lost property report immediately.`, `Tell the staff to collect the lost items.`),
    14: signQ(`Coach trip:\nNo places available. If you've paid a deposit, final payment due tomorrow`, `Tomorrow is the last day for paying what you owe for the coach trip.`, `saying you want to go on the coach trip.`, `paying a deposit for the coach trip.`, `answering the phone.`),
    15: signQ(`Please use upstairs waiting room if you have an appointment with the nurse`, `You can go upstairs to make appointments with the nurse.`, `The nurse can only see patients with appointments.`, `Wait upstairs to see the nurse.`, `The nurse can help everybody here.`)
  },
  ...PART2_3_20
};

// PART 4 passages missing from preview.html
const PART4_PASSAGES = {
  1: {
    title: 'THE FIRST WOMAN SCIENTIST',
    text: `Hepatica was born in Alexandria, in Egypt, in 370 A.D. For many centuries she was (21) ________only woman scientist to have a place in the history books.

Hepatica's father was director of Alexandria University, and he (22) ________sure his daughter had the best education available. This was unusual, as most women then had few (23) ________to study.

After studying in Athens and Rome, Hepatica returned to Alexandria (24) ________she began teaching mathematics. She soon became famous (25) ________her knowledge of new ideas.

We have no copies of her books, (26) ________we know that she wrote several important mathematical works. Hepatica was also interested in technology and (27) ________several scientific tools to help with her work.

At the (28) ________many rulers were afraid of science, and (29) ________connected with it was in danger. One day in March 415, Hepatica (30) ________attacked in the street and killed.`
  },
  2: {
    title: 'CAMPING',
    text: `Although some groups of people have always lived outdoors in tents, camping as we know it today only began to be (21) _______about 50 years ago. The increase in the use of cars and improvements in camping (22) _______have allowed more people to travel longer (23) _______into the countryside and to stay there in greater comfort.

Many campers like to be (24) _______themselves in quiet areas, so they (25) _______their tent and food and walk or cycle into the forests or the mountains. Others, preferring to be near people, drive to a public or privately-owned campsite (26) _______has up-to-date facilities, (27) _______hot showers and swimming pools.

Whether campers are (28) _______in the mountains or on a busy site, they should remember to (29) _______the area clean and tidy. In the forests, they must put out any fires and keep food hidden to avoid attracting (30) _______animals.`
  }
};

export { PART2, PART4_PASSAGES, PART1_FIXES };
