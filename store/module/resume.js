/**
 * 简历的信息
*/
import Vue from 'vue';
const resume = {
	namespaced: true,

	state: {
		resumeData: []
	},

	getters: {
		getResumeData: state => state.resumeData,
		getResumeByIdData: state => (resumeId) => {
			return state.resumeData.find(resume => resume._id == resumeId)
		}
	},

	mutations: {
		setResumeData(state, data) {
			state.resumeData = data
		},
		setResumeByIdData(state, data) {
			let resumeId = data._id
			let resumeIndex = state.resumeData.findIndex(resume => resume._id == resumeId)
			Vue.set(state.resumeData, resumeIndex, data);
		},
		delResumeByIdData(state, data) {
			let resumeId = data._id
			let resumeIndex = state.resumeData.findIndex(resume => resume._id == resumeId)
			state.resumeData.splice(resumeIndex, 1)
		},
		updateResumeName(state, data) {
			let resumeId = data._id
			let resume = state.resumeData.find(resume => resume._id == resumeId)
			resume.resume_name = data.resume_name
		},
		updateResumeTplId(state, data) {
			let resumeId = data._id
			let resume = state.resumeData.find(resume => resume._id == resumeId)
			resume.template_id = data.template_id
		}
	}
}

export default resume
