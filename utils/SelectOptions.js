export const customStylesCountries = {
	menu: (provided, state) => ({
		...provided,
		backgroundColor: '#2a3238',
		color: 'white',
		padding: '0',
		zIndex: '2',
		fontSize: "1rem"
	}),
	container: (provided, state) => ({
		...provided,
		position: "absolute",
		color: 'white',
		padding: '0',
		zIndex: '2',
		fontSize: "1rem",
		top: "17rem",
		left:"1.85rem"
	}),
	menuList: (provided, state) => ({
		...provided,
		padding: 0,
		maxHeight: '13rem',
	}),
	control: (provided, state) => ({
		...provided,
		width: "8rem",
		backgroundColor: 'unset',
		boxShadow: 'none',
		flexWrap:"nowrap",
		borderRadius: '0',
		height: '1rem',
		transition: '1s all',
		zIndex: '1',
		cursor: 'pointer',
		fontSize: "1rem",
		borderColor: 'unset',
		border: "unset",
		minHeight:"unset",
		'&:hover': {
			borderColor: 'unset'
		}

	}),
	singleValue: (provided, state) => ({
		...provided,
		color: '#77718f',
		fontSize: "1rem",
		postion: "relative",
		display: "flex",
		alignItems: "center",
		'img': {
			width: '23px',
			height: '13px',
			marginInlineEnd: ".25rem"
		}
	}),
	placeholder: (provided, state) => ({
		...provided,
		color: '#77718f',
		fontSize: "1rem"
	}),
	dropdownIndicator: (provided, state) => ({
		...provided,
		color: '#77718f'
	}),
	indicatorSeparator: (provided, state) => ({
		...provided,
		display: 'none',
	}),
	indicatorsContainer: (provided, state) => ({
		...provided,
		width: '2.5rem',
		height: '1rem',
		padding: "0",
		margin: "0"
	}),
	valueContainer: (provided, state) => ({
		...provided,
		padding: '0',
		fontSize: "1rem",
		flex: "unset",
		display: "flex",
		width: "5rem"
	}),
	option: (provided, state) => ({
		...provided,
		cursor: 'pointer',
		fontSize: "1rem",
		postion: "relative",
		display: "flex",
		gap: ".5rem",
		alignItems: "center",
		backgroundColor: state.isSelected ? '#77718f' : (state.isFocused) ? 'grey' : 'transparent',
		'&:active': {
			backgroundColor: 'grey'
		},
		'img': {
			width: '23px',
			height: '13px'
		}
	}),


};
export const customStyles = {
	menu: (provided, state) => ({
		...provided,
		backgroundColor: '#2a3238',
		color: 'white',
		padding: '0',
		zIndex: '2',
		fontSize: "1rem"
	}),
	menuList: (provided, state) => ({
		...provided,
		padding: 0,
		maxHeight: '13rem',
	}),
	control: (provided, state) => ({
		...provided,
		backgroundColor: 'unset',
		boxShadow: 'none',
		borderRadius: '1rem',
		height: '5rem',
		transition: '1s all',
		zIndex: '1',
		cursor: 'pointer',
		paddingInline: "1.85rem",
		fontSize: "1rem",
		borderColor: 'rgba(30, 17, 72, 0.2)',
		'&:hover': {
			borderColor: 'rgba(30, 17, 72, 0.2)'
		}

	}),
	singleValue: (provided, state) => ({
		...provided,
		color: '#77718f',
		fontSize: "1rem"
	}),
	placeholder: (provided, state) => ({
		...provided,
		color: '#77718f',
		fontSize: "1rem"
	}),
	dropdownIndicator: (provided, state) => ({
		...provided,
		color: '#77718f'
	}),
	indicatorSeparator: (provided, state) => ({
		...provided,
		display: 'none',
	}),
	valueContainer: (provided, state) => ({
		...provided,
		padding: '0',
		fontSize: "1rem"
	}),
	option: (provided, state) => ({
		...provided,
		cursor: 'pointer',
		fontSize: "1rem",
		backgroundColor: state.isSelected ? '#77718f' : (state.isFocused) ? 'grey' : 'transparent',
		'&:active': {
			backgroundColor: 'grey'
		}
	}),


};

export const customStylesForArticles = {
	menu: (provided, state) => ({
		...provided,
		zIndex: 999,
		// borderRadius: borderRadius,
		boxShadow: "none",
		marginTop: 0
	}),
	valueContainer: (provided, state) => ({
		...provided,
		padding: 0,
		// paddingInlineStart: "0.8rem",
	}),
	indicatorSeparator: () => ({
		display: "none",
	}),
	menuList: (provided) => ({
		...provided,
		padding: "0",
		// boxShadow: "0px 7px 37px 0px #AEC0CFB5",
		border: "none",
		backgroundColor: "#fff",
		borderBottomLeftRadius: '8px',
		borderBottomRightRadius: '8px',
		outline: 'none'
	}),
	container: (provided, state) => ({
		...provided,
		// minWidth: "13rem",
	}),
	option: (provided, state) => ({
		...provided,
		width: "100%",
		padding: "0.5rem 1.1rem",
		textTransform: "capitalize",
		color: "#211D33",
		backgroundColor: "#fff",
		backgroundColor: state.isSelected ? "#DEE6ED" : "#fff",
		cursor: "pointer",
		width: "100%",
		fontWeight: 'bold',
		"&:hover": {
			backgroundColor: "#DEE6ED",
		},
	}),
	control: (provided, state) => ({
		...provided,
		backgroundColor: "#fff",
		display: "flex",
		color: "#000",
		border: "none",
		padding: "0.8rem 1rem",
		paddingInlineEnd: "0.5rem",
		borderRadius: state.menuIsOpen ? '8px 8px 0 0' : '8px',
		borderBottom: state.menuIsOpen ? 'solid 1px #DEE6ED' : 'solid 1px transparent',
		outline: "none",
		boxShadow: "none",
		cursor: "pointer",
		minHeight: "25px",
		fontWeight: 'bold',
		"&:hover": {
			borderColor: state.menuIsOpen ? '#DEE6ED' : "transparent",
		},
	}),
	clearIndicator: (styles) => ({
		...styles,
		paddingTop: 7,
		paddingBottom: 7,
	}),
	indicatorContainer: (provided, state) => ({
		...provided,
		padding: "0 !important",
	}),
	dropdownIndicator: (provided, state) => ({
		...provided,
		primary: "white",
		border: "none",
		paddingTop: 4,
		paddingBottom: 4,
	}),
	placeholder: (provided, state) => ({
		...provided,
		color: "#000",
	}),
	singleValue: (provided, state) => ({
		...provided,
		color: "#000",
	}),
	input: (provided, state) => ({
		...provided,
		color: "#000",
	}),
}

export const customStylesMobile = {
	menu: (provided, state) => ({
		...provided,
		zIndex: 999,
		width: "100%",
		// borderRadius: borderRadius,
	}),
	valueContainer: (provided, state) => ({
		...provided,
		padding: 0,
		paddingInlineStart: "1rem",
	}),
	indicatorSeparator: () => ({
		display: "none",
	}),
	menuList: (provided) => ({
		...provided,
		padding: "1rem 0",
		width: "100%",
		boxShadow: "0px 7px 37px 0px #AEC0CFB5",
		border: "none",
		backgroundColor: "#fff",
		// borderRadius: borderRadius,
	}),
	container: (provided, state) => ({
		...provided,
		width: "100%",
	}),
	option: (provided, state) => ({
		...provided,
		width: "100%",
		padding: ".5rem 2rem",
		textTransform: "capitalize",
		color: state.isSelected ? "#fff" : "#000",
		backgroundColor: "#fff",
		backgroundColor: state.isSelected ? "#000" : "#fff",
		cursor: "pointer",
		width: "100%",
		"&:hover": {
			backgroundColor: "000",
			color: "#fff",
		},
	}),
	control: (provided, state) => ({
		...provided,
		backgroundColor: "#fff",
		display: "flex",
		color: "#000",
		border: "none",
		padding: ".6rem",
		// borderRadius: borderRadius,
		outline: state.isFocused ? "none" : "none",
		boxShadow: "none",
		cursor: "pointer",
		minHeight: "25px",
		boxShadow: "0px 1px 3px 0px #AEC0CFB5",
	}),
	// control: (base) => ({
	// 	...base,
	// 	height: 25,
	// 	minHeight: 25,
	// }),
	clearIndicator: (styles) => ({
		...styles,
		paddingTop: 7,
		paddingBottom: 7,
	}),
	indicatorContainer: (provided, state) => ({
		...provided,
		padding: "0 !important",
	}),
	dropdownIndicator: (provided, state) => ({
		...provided,
		primary: "white",
		border: "none",
		paddingTop: 4,
		paddingBottom: 4,
	}),
	placeholder: (provided, state) => ({
		...provided,
		color: "#000",
	}),
	singleValue: (provided, state) => ({
		...provided,
		color: "#000",
	}),
	input: (provided, state) => ({
		...provided,
		color: "#000",
	}),
}

export const customStyles2 = {
	menu: (provided, state) => ({
		...provided,
		zIndex: 999,
		width: "100%",
		// borderRadius: borderRadius,
		left: 0,
	}),
	valueContainer: (provided, state) => ({
		...provided,
		padding: 0,
		paddingInlineStart: "0rem",
	}),
	indicatorSeparator: () => ({
		display: "none",
	}),
	menuList: (provided) => ({
		...provided,
		padding: "1rem 0",
		width: "100%",
		boxShadow: "none",
		border: "none",
		backgroundColor: "transparent",
		// borderRadius: borderRadius,
	}),
	container: (provided, state) => ({
		...provided,
		width: "100%",
		padding: "0 1rem",
	}),
	option: (provided, state) => ({
		...provided,
		width: "100%",
		padding: ".5rem 2rem",
		textTransform: "capitalize",
		color: state.isSelected ? "#fff" : "#000",
		backgroundColor: "#fff",
		backgroundColor: state.isSelected ? "#000" : "#fff",
		cursor: "pointer",
		width: "100%",
		fontSize: "1rem",
	}),
	control: (provided, state) => ({
		...provided,
		backgroundColor: "#fff",
		display: "flex",
		color: "#000",
		border: "none",
		padding: "0rem",
		paddingInlineStart: "0",
		// borderRadius: borderRadius,
		outline: state.isFocused ? "none" : "none",
		boxShadow: "none",
		cursor: "pointer",
		width: "100%",
		height: "3rem",
		// boxShadow: '0px 7px 37px 0px #AEC0CFB5',
	}),

	dropdownIndicator: (provided, state) => ({
		...provided,
		primary: "white",
		border: "none",
	}),
	placeholder: (provided, state) => ({
		...provided,
		color: "#000",
		fontSize: "1rem",
	}),
	singleValue: (provided, state) => ({
		...provided,
		color: "#000",
		fontSize: "1rem",
	}),
	input: (provided, state) => ({
		...provided,
		color: "#000",
		fontSize: "1rem",
	}),
}

export const customStyles3 = {
	menu: (provided, state) => ({
		...provided,
		zIndex: 999,
		width: "100%",
		// borderRadius: borderRadius,
		left: 0,
	}),
	valueContainer: (provided, state) => ({
		...provided,
		padding: 0,
		paddingInlineStart: "0rem",
	}),
	indicatorSeparator: () => ({
		display: "none",
	}),
	menuList: (provided) => ({
		...provided,
		padding: "1rem 0",
		width: "100%",
		boxShadow: "none",
		border: "none",
		backgroundColor: "transparent",
		// borderRadius: borderRadius,
	}),
	container: (provided, state) => ({
		...provided,
		width: "100%",
		padding: "0 1rem",
	}),
	option: (provided, state) => ({
		...provided,
		width: "100%",
		padding: ".5rem 2rem",
		textTransform: "capitalize",
		color: state.isSelected ? "#fff" : "#000",
		backgroundColor: "#fff",
		backgroundColor: state.isSelected ? "#000" : "#fff",
		cursor: "pointer",
		width: "100%",
		fontSize: "1rem",
		"&:hover": {
			backgroundColor: "#000",
			color: "#fff",
		},
	}),
	control: (provided, state) => ({
		...provided,
		backgroundColor: "#fff",
		display: "flex",
		color: "#000",
		border: "none",
		padding: "0rem",
		paddingInlineStart: "0",
		// borderRadius: borderRadius,
		outline: state.isFocused ? "none" : "none",
		boxShadow: "none",
		cursor: "pointer",
		width: "100%",
		height: "3rem",
		// boxShadow: '0px 7px 37px 0px #AEC0CFB5',
	}),

	dropdownIndicator: (provided, state) => ({
		...provided,
		primary: "white",
		border: "none",
	}),
	placeholder: (provided, state) => ({
		...provided,
		color: "#000",
		fontSize: "1rem",
	}),
	singleValue: (provided, state) => ({
		...provided,
		color: "#000",
		fontSize: "1rem",
	}),
	input: (provided, state) => ({
		...provided,
		color: "#000",
		fontSize: "1rem",
	}),
}
