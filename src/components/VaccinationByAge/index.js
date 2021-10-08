import {Legend, ResponsiveContainer, PieChart, Pie, Cell} from 'recharts'

const ageColors = ['#2d87bb', '#a3df9f', '#64c2a6']

const VaccinationCoverage = props => {
  const {vaccinationByAge} = props

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart width={1000} height={300}>
        <Pie
          cx="50%"
          cy="50%"
          data={vaccinationByAge}
          dataKey="count"
          nameKey="age"
          fill="red"
          legendType="circle"
        >
          {ageColors.map(clr => (
            <Cell fill={clr} key={`clr-${clr}`} />
          ))}
        </Pie>
        <Legend
          wrapStyle={{
            padding: 10,
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
export default VaccinationCoverage
