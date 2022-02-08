import Moody from '../images/speakers/Moody.png'
import Quines from '../images/speakers/Quines.png'
import Rajesh from '../images/speakers/Rajesh.png'
import Salzedo from '../images/speakers/Salzedo.png'
import Scheffield from '../images/speakers/Scheffield.png'
import Sipser from '../images/speakers/Sipser.png'
import Yew from '../images/speakers/Yew.png'
import Wen from '../images/speakers/Wen.png'
import Cy from '../images/speakers/Cy.png'


const speakers = [
  {
    name: 'Sameer Rajesh',
    role: 'Junior @ UC Berkeley',
    imageUrl:
      Rajesh,
    title: 'Itsy Bitsy Origami',
    description: 
      `Beginning with a brief discussion and survey of the introduction of concepts from physics 
      to the study of biology, we will make our way through understanding the protein folding problem 
      and looking at recent advances, culminating in the recent release of AlphaFold as an efficient 
      protein structure prediction algorithm. Topics include biophysics, modeling, and computational 
      methods in biology.`,
    background: 
      `Sameer Rajesh is a rising junior at UC Berkeley studying Molecular and Cell Biology. Sameer’s 
      interests lie in biophysics and biophysical chemistry, and he uses tools from these fields to 
      help build physical models for biological phenomena. When not hunched over his bench, he’s usually 
      hanging out with friends, watching TV, and, as of recently, dabbling in writing.`,
    link: 'https://www.youtube.com/watch?v=L53MnG4uOlo',
    date: 'August 2, 2021'
  },
  {
    name: 'CJ Quines',
    role: 'Junior @ MIT',
    imageUrl:
      Quines,
    title: 'Type Theory',
    description: 
      `What are types, how are they related to proofs, and how do computers use them to automatically 
      check proofs?`,
    background: 
      `CJ Quines is a rising junior at the Massachusetts Institute of Technology, studying math and 
      computer science. He represented the Philippines at the IOI and at the APMO, where he won a bronze 
      medal and participated in their IMO training camps; additionally, he and his partner won second 
      prize for their mathematics project at Intel ISEF. Currently, he helps run the Philippines’ training 
      camps for the IOI and IMO. In his free time, CJ enjoys writing, talking to friends, and giving and 
      receiving hugs.`,
    link: 'https://www.youtube.com/watch?v=bnbOlnRa5rM&pp=sAQA',
    date: 'July 31, 2021'
  },
  {
    name: 'Dr. Chong Hon Yew',
    role: 'President @ Astronomical Society of Penang',
    imageUrl:
      Yew,
    title: 'Hubble is great; what will James Webb tell us?',
    description: 
      `Since its launch in 1990, the Hubble Space Telescope has not ceased to amaze astronomers and 
      astronomy enthusiasts around the world with its amazing images of astronomical objects, ranging 
      from the Earth and nearby stars to the edge of the observable universe. The James Webb Space 
      Telescope, to be launched in late 2021, will explore even further into the universe and discover 
      unimaginable astronomical objects and astrophysical phenomena. What could these include, and how 
      are they practical today?`,
    background: 
      `Dr. Chong Hon Yew is the president of the Astronomical Society of Penang, Malaysia. Dr. Chong 
      received his Ph.D. in Low-Temperature Physics from the University of Grenoble, France in 1979 and 
      later became a lecturer in physics at the University of Science, Malaysia. As an advisor to the 
      university’s astronomy club, he has promoted a variety of astronomy activities in schools, colleges, 
      government departments, multinational companies, and large shopping complexes.`,
    link: 'https://youtu.be/KRKYn1Eyp7E',
    date: 'July 28, 2021'
  },
  {
    name: 'Professor Michael Sipser',
    role: 'Professor @ MIT',
    imageUrl:
      Sipser,
    title: 'P vs NP',
    description: 
      ``,
    background: 
      `Professor Sipser is a theoretical computer scientist at MIT. He is the Donner Professor of 
      Mathematics, a member of CSAIL, and currently the Dean of Science at MIT. His distinctions include 
      the MIT Graduate Student Council Teaching Award, 1984, 1989 & 1991, the MIT School of Science 
      Student Advising Award, 2003, the U.C. Berkeley Distinguished Alumni Award, 2015.`,
    link: 'https://www.youtube.com/channel/UCGyILrSYokhRvJ_ibJKlMfw',
    date: 'July 26, 2020'
  },
  {
    name: 'Ali Cy',
    role: 'Contestant @ European Girls’ Math Olympiad (EGMO)',
    imageUrl:
      Cy,
    title: 'Meta-Solving',
    description: 
      ``,
    background: 
      `Ali is a rising high-school junior who has been a passionate math contestant for three years.  
      She took part in the 2020 European Girls’ Math Olympiad as part of Team USA and received a silver medal, 
      and scored 27 on the 2019 USA Junior Math Olympiad. She also enjoys programming, playing anime songs 
      on the piano, and writing.`,
    link: 'https://www.youtube.com/watch?v=XF9CkgtK7ug',
    date: 'July 19, 2020'
  },
  {
    name: 'Professor Scott Scheffield',
    role: 'Professor @ MIT',
    imageUrl:
      Scheffield,
    title: 'Martingales and the Optional Stopping Theorem',
    description: 
      ``,
    background: 
      `Professor Scott Sheffield is a professor of mathematics at MIT. Sheffield is a probability 
      theorist, working on geometrical questions that arise in such areas as statistical physics, game 
      theory, and metric spaces, as well as long-standing problems in percolation theory. Sheffield 
      graduated from Harvard University in 1998 with an A.B. and A.M. in mathematics, and in 2003, 
      received his Ph.D. in mathematics from Stanford University. Before becoming a professor at MIT,
      Sheffield held postdoctoral positions at Microsoft Research, the University of California at 
      Berkeley, and the Institute for Advanced Study.`,
    link: 'https://www.youtube.com/channel/UCGyILrSYokhRvJ_ibJKlMfw',
    date: 'July 18, 2020'
  },
  {
    name: 'Simon Rubinstein-Salzedo',
    role: 'Founder @ Euler Math Circle',
    imageUrl:
      Salzedo,
    title: 'Division points of hypocycloids',
    description: 
      ``,
    background: 
      `Simon Rubinstein-Salzedo received his Ph.D. in mathematics from Stanford University in 2012. 
      Afterward, he taught at Dartmouth College and Stanford University. In 2015, he founded Euler 
      Circle, a mathematics institute in the San Francisco Bay Area, dedicated to teaching college-level 
      mathematics classes to advanced high-school students, as well as mentoring them in mathematics 
      research. His research interests include number theory, algebraic geometry, combinatorics,
      probability, and game theory. He is also the namesake of SFFT (Simon’s Favorite Factoring Trick).`,
    link: 'https://www.youtube.com/channel/UCGyILrSYokhRvJ_ibJKlMfw',
    date: 'July 18, 2020'
  },
  {
    name: 'Tovi Wen',
    role: 'Captain @ Hunter College Math Team',
    imageUrl:
      Wen,
    title: 'The Nine Point Circle',
    description: 
      ``,
    background: 
      `At 17, Tovi is captain of the senior math team at Hunter College High School. As a member of NYC’s 
      premier math team, he has represented the city at competitions including Harvard/MIT’s HMMT, 
      Carnegie Mellon’s CMIMC and Princeton’s PUMaC, where he was an individual finalist. A junior US 
      Math Olympiad qualifier, he is an experienced tutor and teaching assistant and has presented an 
      academic paper at CUNY Graduate Center in MoMath’s 2019 MOVES Conference.`,
    link: 'https://www.youtube.com/watch?v=SPAPMyfd1GU',
    date: 'July 17, 2020'
  },
  {
    name: 'CJ Quines',
    role: 'Sophomore @ MIT',
    imageUrl:
      Quines,
    title: 'Diagonalization',
    description: 
      ``,
    background: 
      `CJ Quines is a rising junior at the Massachusetts Institute of Technology, studying math and 
      computer science. He represented the Philippines at the IOI and at the APMO, where he won a bronze 
      medal and participated in their IMO training camps; additionally, he and his partner won second 
      prize for their mathematics project at Intel ISEF. Currently, he helps run the Philippines’ training 
      camps for the IOI and IMO. In his free time, CJ enjoys writing, talking to friends, and giving and 
      receiving hugs.`,
    link: 'https://www.youtube.com/watch?v=rBwnNzKl3iM',
    date: 'July 3, 2021'
  },
  {
    name: 'D. Branch Moody, MD',
    role: 'Professor of Medicine @ Harvard Medical School',
    imageUrl:
      Moody,
    title: 'The 4 Big Questions of Science',
    description: 
      ``,
    background: 
      `Branch Moody is a Physician at Brigham and Women’s Hospital and a Professor of Medicine at Harvard 
      Medical School. He earned his MD at The Johns Hopkins University School of Medicine in 2002. His 
      lab focuses on the natural interactions of human Dendritic cells and T cells and uses human systems 
      to study the roles of CD1 proteins, Toll-like receptors and lipid antigens in T cell responses to 
      tuberculosis, HIV, and autoimmune diseases.`,
    link: 'https://www.youtube.com/channel/UCGyILrSYokhRvJ_ibJKlMfw',
    date: 'July 2020'
  },
]

export default speakers;