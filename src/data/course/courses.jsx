import Math from '../../images/books/Math.png'  
import Astronomy from '../../images/books/Astronomy.png'  
import Physics from '../../images/books/Physics.png'  
import Math1H from '../../files/Math1.pdf'
import BiologyH from '../../files/Biology.pdf'
import PhysicsH from '../../files/Physics.pdf'
import MathSample from '../../files/samples/Math1_BasicCounting_2021.pdf'
import BiologySample from '../../files/samples/Biology_CellMetabolismCycle_2021.pdf'
import AstronomySample from '../../files/samples/Astronomy_CelestialCoordinateConversions_2021.pdf'
import PhysicsSample from '../../files/samples/Physics_OrbitalMechanics_2021.pdf'

const courses = {
  'physics': {
    name: 'Physics Mechanics',
    img: 'https://everaise.org/wp-content/uploads/2020/04/Screen-Shot-2020-04-24-at-9.32.13-PM.png',
    desc: `A rigorous treatment of mechanics including kinematics, Newton’s laws, collisions, 
                        rolling motion, oscillations, fluid statics, fictitious forces, and error analysis.`,
    dates: 'June 21 – August 6',
    link: 'physics',
    topics: [['Kinematics in One Dimension and Calculus Overview', 'Kinematics in Two Dimensions', 'Newton’s Laws', 'Friction', 'Momentum and Collisions'], ['Energy', 'Springs', 'Central Forces', 'Angular Kinematics', 'Angular Dynamics'], ['Rolling motion', 'Statics', 'Oscillations', 'Gravitation', 'Orbital Mechanics'], ['Fluid Statics', 'Fluid Dynamics', 'Fictitious Forces', 'Error Propagation and Analysis']],
    book: {
      people: 'Brian Lee and William Shi',
      image: Physics,
      title: 'Everaise Academy: Physics Mechanics',
      sample: PhysicsSample,
    },
    testimonial: {
      quote: 'Tons of problem solving skills, different aspects and considerations in advanced researches in the Sciences (via guest lectures), having to communicate with avid learners from all over the world and a brand-new respect and appreciation for Physics!',
      name: 'Felix Yew',
    },
    diagnostic: PhysicsH,
    prereq: <p className="mt-2">Physics: Students at or approaching USAPhO qualification or with sufficient math or physics background.</p>
  },
  'biology': {
    name: 'Biology',
    img: 'https://everaise.org/wp-content/uploads/2020/05/received_864303084037580.png',
    desc: `A deep study of theoretical biology, covering a range of topics from cell biology, 
                          genetics, and human anatomy and physiology to the mechanisms underlying plant life`,
    dates: 'July 5 – August 6',
    link: 'biology',
    topics: [['Fundamentals of Macromolecules', 'Membrane Structures', 'Proteins', 'Cellular Metabolism and Cell Cycle', 'Signal Transduction', 'Advanced Topics in Cell Biology'], ['The Genetic Basis of Life', 'The Central Dogma – Transcription', 'The Central Dogma – Translation', 'Population Genetics', 'Phylogenetics / Evolutionary Genetics', 'Biotechnology'], ['Integumentary System, Skeletal System, Muscular System', 'Cardiovascular System, Respiratory System', 'Nervous System', 'Endocrine System, Digestive System', 'Urinary System, Immune System', 'Reproductive System, Development'], ['Fundamentals of Plant Anatomy', 'The Plant Root', 'The Movement of Water / Solutes', 'Plant Hormones', 'Photosynthesis', 'Evolution of Plants']],
    book: {
      people: '',
      image: '',
      title: 'Everaise Academy: Biology',
      sample: BiologySample,
    },
    testimonial: {
      quote: 'The best part of the program were learning something new everyday in a well presented manner through the handouts. I loved how the information in the handout was easy to digest so I could understand them better',
      name: 'Sushrit Pasumarthy',
    },
    diagnostic: BiologyH,
    prereq: <p className="mt-2">Biology: Students who have participated in USABO or have completed a high school biology course.</p>
  },
  'math': {
    name: 'Math Competitions I',
    img: 'https://everaise.org/wp-content/uploads/2020/04/Screen-Shot-2020-04-24-at-9.31.32-PM.png',
    desc: `An intuition-building math competitions course including sequences and series, 
                          polynomials, combinatorial identities, triangle centers, and modular arithmetic.`,
    dates: 'July 12 – August 6',
    link: 'math',
    topics: [['Exponents, Radicals, Logarithms', 'Sequences and Series', 'Polynomials, Graphs'], ['Angles, Circles', 'Triangles and Triangle Centers', 'Area, Length, Ratios'], ['Casework and Complementary Counting', 'Principle of Inclusion-Exclusion', 'Probability'], ['Bases, Decimal Representations', 'Primes, Factorizations, GCD/LCM', 'Modular Arithmetic']],
    book: {
      people: 'Saadiq Shaikh and Matthew Chen',
      image: Math,
      title: 'Everaise Academy: Math Competitions I',
      sample: MathSample,
    },
    testimonial: {
      quote: 'The commitment to learning and excellence all for free really stood out. Normally, you would assume people to charge large swaths of money for content of this standard and genre, but the level at which content was presented and the follow-up and help to students was phenomenal and at the same time was free of cost.',
      name: 'Krish Shah',
    },
    diagnostic: Math1H,
    prereq: <p className="mt-2">Math 1: Students at or approaching AIME qualification.</p>
  },
  'astronomy': {
    name: 'Astronomy',
    img: 'https://everaise.org/wp-content/uploads/bop.jpg',
    desc: `An introductory course in astronomy, including celestial coordinates, stellar systems, 
                          and cosmology in addition to important physics topics such as orbital mechanics.`,
    dates: 'July 12 – August 6',
    link: 'astronomy',
    topics: [['Introduction to Astronomy', 'Kinematics', 'Momentum and Collisions', 'Dynamics and Rotation', 'Gravitation'], ['Orbital Mechanics', 'Spherical Geometry', 'Celestial Coordinate Systems 1', 'Celestial Coordinate System 2', 'Celestial Coordinate Conversions'], ['Celestial Timekeeping Systems', 'Geocentric Planetary Phenomena', 'Reduction in positional observations', 'Physics of Stars and Planets', 'Stellar Evolution'], ['Stellar Systems', 'Cosmic Distance Ladder', 'Cosmology', 'Optics', 'Night Sky Observation']],
    book: {
      people: 'Chooi Je Qin and Gregory Pylypovych',
      image: Astronomy,
      title: 'Everaise Academy: Astronomy',
      sample: AstronomySample,
    },
    testimonial: {
      quote: 'The best part about the program was how organized everything was. We got the handout schedule way before the program started, so I always knew what was coming. The handouts were generally well-written and comprehensive as well. The Everaise team clearly put a lot of effort into planning these 5 weeks.',
      name: 'Cindy Yu',
    },
    diagnostic: '',
    prereq: <p className="mt-2">Astronomy: Students at or approaching NAO qualification or have a strong background in trigonometry.</p>
  },
}

export default courses;