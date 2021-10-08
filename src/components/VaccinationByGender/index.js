import {Legend, ResponsiveContainer, PieChart, Pie, Cell} from 'recharts'

const genderColors = ['#f54394', '#5a8dee', '#2cc6c6']

const VaccinationByGender = props => {
  const {vaccinationByGender} = props

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart width={1000} height={300}>
        <Pie
          cx="50%"
          cy="50%"
          data={vaccinationByGender}
          dataKey="count"
          nameKey="gender"
          startAngle={180}
          endAngle={0}
          innerRadius={50}
          outerRadius={90}
          fill="red"
          legendType="circle"
        >
          {genderColors.map(clr => (
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
export default VaccinationByGender
