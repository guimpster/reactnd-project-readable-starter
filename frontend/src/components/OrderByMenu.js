import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import classnames from 'classnames';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';


const styles = theme => ({
    typo: {
      flexDirection: 'column',
      backgroundColor: theme.palette.background.paper,
      marginTop: 10,
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        })
    },
    icon: {
        flexDirection: 'column',
        marginLeft: 8,
        fontSize: 15,
    },
})

class OrderButton extends Component {
    state = {
        direction: 'none',
        expanded: false
    }

    toggleClickHandler = (prop) => {
        const { direction } = this.state
        const { toggleClickHandler } = this.props

        switch(direction) {
            case "down":
                this.setState({ direction: "up" })
                toggleClickHandler('asc', prop)
            break
            case "up":
            default:
                this.setState({ direction: "down" })
                toggleClickHandler('desc', prop)
            break
        }
    }

    render() {
        const { direction } = this.state
        const { sortBy, classes } = this.props

        return (
            <div className={classes.typo} >
                {sortBy.map((prop, idx) => (
                    <span key={idx} className={classes.icon}>
                        <IconButton
                            className={classnames(classes.expand, {
                                [classes.expandOpen]: this.state.expanded,
                            }, classes.icon)}
                            variant="raised"
                            onClick={() => this.toggleClickHandler(prop)}
                            aria-expanded={this.state.expanded}
                        >
                            <ExpandMoreIcon />{prop.text}
                        </IconButton>
                    </span>
                ))}
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(OrderButton)