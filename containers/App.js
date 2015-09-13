import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Gol from '../components/Gol';
import * as GolActions from '../actions/gol';

function mapStateToProps(state) {
	return {
		generationId: state.gol.get('generationId'),
		cells: state.gol.get('cells'),
	};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GolActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Gol);
