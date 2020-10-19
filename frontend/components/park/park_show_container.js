import React from "react";
import { connect } from "react-redux";
import ParkShow from "./park_show";
import { fetchPark } from "../../actions/park_actions"

const mSTP = (state, ownProps) => {
    // debugger

    return {
      park: state.entities.parks[ownProps.match.params.parkId],
    //   loading: state.ui.loading.indexLoading,
    };
}

const mDTP = dispatch => {
    return {
        fetchPark: parkId => dispatch(fetchPark(parkId))
    }
}

export default connect(mSTP, mDTP)(ParkShow);