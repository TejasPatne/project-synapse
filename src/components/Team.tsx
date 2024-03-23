import Person from "./Person";

export default function Team({ team, photos }: {team: string[], photos: string[]}) {
  return (
    <div className="flex flex-col md:gap-10 mt-10 md:mt-20">
      <div className="flex flex-col md:flex-row justify-between items-center gap-5">
        <Person name={team[0]} photo={photos[0]} />
        <Person name={team[1]} photo={photos[1]} />
      </div>
      <div className="flex flex-col gap-5">
        <p className="font-medium text-xl">Team</p>
        <div className="flex flex-col md:flex-row md:flex-wrap justify-between items-center gap-5">
          {
            team.map((member, index) => {
              if(index > 1 && !!member){
                return <Person key={member} name={member} photo={photos[index]} />
              }
            })
          }
        </div>
      </div>
    </div>
  )
}
