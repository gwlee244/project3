import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import { getDoctorsList, clearFinded, findToken } from "../../actions/utilsAction";
import cardProfile from "./cardProfile";
import Loader from "../../utils/Loader";
import SearchTokenDialog from "./SearchTokenDialog";

const styles = theme => ({
	fab: {
		position: "fixed",
		bottom: theme.spacing.unit * 2,
		right: theme.spacing.unit * 2
	},
	extendedIcon: {
		marginRight: theme.spacing.unit
	}
});

class DoctorsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dialogOpen: false,
			token: ""
		};
		this.dialogOpen = this.dialogOpen.bind(this);
		this.dialogClose = this.dialogClose.bind(this);
		this.handleFab = this.handleFab.bind(this);
		this.handleToken = this.handleToken.bind(this);
		this.onChangeDialog = this.onChangeDialog.bind(this);
	}

	dialogOpen = () => {
		this.setState({ dialogOpen: true });
	};

	dialogClose = () => {
		this.props.clearFinded();
		this.setState({ dialogOpen: false, token: "" });
	};

	handleFab = () => {
		this.dialogOpen();
	};

	handleToken = () => {
		this.props.findToken(this.state.token);
	};

	onChangeDialog = ev => {
		this.setState({
			token: ev.target.value
		});
	};

	componentDidMount() {
		this.props.getDoctorsList(this.props.auth.user.id);
	}
  render() {
    let content = null;
    let { doctorData, findedDoctor } = this.props.general;
    const { classes } = this.props;
    if (doctorData == null) {
      content = (
        <div className="centerize">
          <Loader />
        </div>
      );
    }
    else {
      content =
        doctorData.map((element, index) => {
          return (<cardProfile parent={this.props.auth.user.id}
            keys={index} user={element} />);
        });
    }
    return (
      <div className="doctorsTab">
        <div>
          {content}
        </div>
        <Fab color="secondary"
          className={classes.fab}
          onClick={this.handleFab} >
          <AddIcon />
        </Fab>

        <Dialog open={this.state.dialogOpen}
          onClose={this.dialogClose} >
          <DialogTitle>
            Add your doctor
    </DialogTitle>
          <DialogContent>
            <DialogContentText>
              To find a doctor and add to your list please insert the token you received from your doctor
      </DialogContentText>
            <div className="flex">
              <TextField
                id="token"
                label="token"
                type="text"
                onChange={this.onChangeDialog}
              />
              <IconButton
                onClick={this.handleToken}
                color="primary">
                <SearchIcon />
              </IconButton>
            </div>

          </DialogContent>
          {findedDoctor ? (
            <SearchTokenDialog
              close={() => { this.dialogClose(); }}
              doctor={findedDoctor}
            />
          ) : (
              ""
            )}
          <DialogActions>
            <Button onClick={() => { this.dialogClose(); }}
              color="primary">
              Cancel
        </Button>
          </DialogActions>
        </Dialog>
      </div >
    );
  }
}
DoctorsList.propTypes= {
  auth: PropTypes.object.isRequired,
  general: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  general: state.general
})

export default connect(mapStateToProps, { getDoctorsList, findToken, clearFinded })
(withStyles(styles)
(DoctorsList));


