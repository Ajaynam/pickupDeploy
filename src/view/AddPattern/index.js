
import { injectReducer } from '../../store';
import adminPatternReducer from './store';
import { Card } from './../../components/ui';
import EmployeeTableTools from './components/EmployeeTableTools';
import PatternTable from './components/PatternTable';


injectReducer('adminPatternList', adminPatternReducer)

const Employee = () => {
    return (
        <Card className='mb-8'>
            <div className="md:flex items-center justify-between mb-6">
                <h4>All  Pattern List</h4>
                <EmployeeTableTools />
            </div>
            <PatternTable />
        </Card>
    )
}

export default Employee