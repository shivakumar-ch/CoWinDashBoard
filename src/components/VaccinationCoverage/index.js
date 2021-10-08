import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

const VaccinationCoverage = props => {
  const {last7DaysVaccination} = props

  const DataFormatter = num => {
    console.log(num)
    if (num > 2000) {
      return `${(num / 2000).toString()}k`
    }
    return num.toString()
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        width={1000}
        height={400}
        data={last7DaysVaccination}
        margin={{top: 5}}
      >
        <XAxis
          dataKey="vaccineDate"
          tick={{
            stroke: '#6c757d',
            strokeWidth: 1,
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: '#6c757d',
            strokeWidth: 1,
          }}
        />
        <Legend
          wrapStyle={{
            padding: 10,
          }}
        />
        <Tooltip />
        <Bar dataKey="dose1" name="Dose 1" fill="#5a8dee" barSize="20%" />
        <Bar dataKey="dose2" name="Dose 2" fill="#f54394" barSize="20%" />
      </BarChart>
    </ResponsiveContainer>
  )
}
export default VaccinationCoverage
