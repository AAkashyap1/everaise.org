import { Link } from 'react-router-dom'

export default function CourseFormat() {
  return (
    <div>
      <p className="text-xl text-gray-500">
        Throughout our courses, students will work through handouts and watch videos that develop
        theory, provide examples to cultivate a true understanding of the material, and provide challenging problems
        to be submitted for homework. Each set of handouts and videos is expected to take roughly 4-5 hours per
        topic, so students who wish to gain a deep understanding of the material should expect to spend about <b>12-15
          hours per week</b>.
      </p>
      <p className="mt-4 text-xl text-gray-500">
        Our web portal, <span className="text-indigo-500">
          <Link to="/launch" target="_blank">Everaise Launch</Link></span>, is up and running! Register for classes,
        view the course materials, and submit homework problems through Launch. All
        courses are self-paced with recommended due dates; students are free to jump around between the
        accessible materials but are advised to work on them in the order they are presented.
      </p>
      <p className="mt-4 text-xl text-gray-500">
        Instructors are available via Discord, which is used for general communication on our discussion board,
        collaboration between students, and live office hours that run several times per week. Students gain access
        to our Discord server upon being admitted to a course.
      </p>
    </div>
  )
}