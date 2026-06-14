function q(text, a, b, c, d) {
  return { text, options: { A: a, B: b, C: c, D: d } };
}

/** TEST 18 Part 1 — questions have no numbers in source document */
export const PART1_FIXES = {
  18: {
    1: q('Scientists have discovered a close between smoking and several serious diseases.', 'contact', 'connection', 'coordination', 'combination'),
    2: q('The president his intention to retire before the next election.', 'told', 'informed', 'promised', 'announced'),
    3: q('The gunman the pilot of the plane to change the direction.', 'demanded', 'forced', 'made', 'controlled'),
    4: q("The bank won't lend you the money without some ____ that you will pay it back.", 'profit', 'interest', 'charge', 'guarantee'),
    5: q('I will do anything but _____ the dishes.', 'wash', 'to wash', 'washing', 'will wash'),
    6: q("They shouldn't have _____ the accident. It wasn't my fault.", 'accused me of', 'accused me with', 'blamed me for', 'blamed me'),
    7: q('After he had broken his leg, Henry could only go up and down stairs _____.', 'hardly', 'in difficulties', 'with difficulty', 'hard'),
    8: q('Supposing I to agree with your request, how do you think the other students would feel?', 'would', 'am', 'were', 'could'),
    9: q('I walked away as calmly as I could _____ they thought I was the thief.', 'to avoid', 'just', 'owing to', 'in case'),
    10: q('_____ a fire, hotel guests are asked to remain calm.', 'As a result of', 'In the event of', 'By reason of', 'In the time of')
  }
};
