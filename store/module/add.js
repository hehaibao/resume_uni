/**
 * 修改简历的信息
*/
const resume = {
	namespaced: true,

	state: {
		info: {},
		schoolInfo: {},
		workInfo: [],
		projectInfo: [],
		majorInfo: '',
		evaluateInfo: ''
	},

	getters: {
		getInfoData: state => {
			return state.info
		},
		getSchoolInfoData: state => {
			return state.schoolInfo
		},
		getWorkInfoData: state => {
			return state.workInfo
		},
		getProjectInfoData: state => {
			return state.projectInfo
		},
		getMajorInfoData: state => {
			return state.majorInfo
		},
		getEvaluateInfoData: state => {
			return state.evaluateInfo
		},
		getResumeInfoData: (state) => {
			let info = JSON.parse(JSON.stringify(state.info))
			return {
				...state.info,
				educationalList: state.schoolInfo,
				workList: state.workInfo,
				projectList: state.projectInfo,
				major_about: state.majorInfo,
				evaluate_about: state.evaluateInfo
			}
		}

	},

	mutations: {
		setInfoData(state, data) {
			state.info = data
		},
		setSchoolInfoData(state, data) {
			state.schoolInfo = data
		},
		setWorkInfoData(state, data) {
			state.workInfo = data
		},
		setProjectInfoData(state, data) {
			state.projectInfo = data
		},
		setMajorInfoData(state, data) {
			state.majorInfo = data
		},
		setEvaluateInfoData(state, data) {
			state.evaluateInfo = data
		},
		clearAddData(state) {
			state = {
				info: {},
				schoolInfo: {},
				workInfo: [],
				projectInfo: [],
				majorInfo: '',
				evaluateInfo: ''
			}
		}
	}
}

export default resume
