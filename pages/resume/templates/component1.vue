<template>
	<view class="resume-info tpl1" v-if="resumeInfo">
		<head-custom :addHeight="20" bgColor="#333" :isBack="isShare ? false : true">
			<block slot="content">{{resumeInfo.resume_name}}</block>
		</head-custom>
		<view class="body">
			<view class="info-body share">
				<view class="info-userinfo">
					<view class="material">
						<view class="name">{{resumeInfo.user_name}}  <text :class="resumeInfo.user_sex=='保密' ? '' : resumeInfo.user_sex=='男' ? 'cuIcon-male' : 'cuIcon-female'"></text></view>
						<view class="data">
							{{resumeInfo.user_birthday | yearFilter}}岁 
							<text class="sp">|</text> 
							{{resumeInfo.user_marriage}} 
							<text class="sp">|</text> 
							{{resumeInfo.working_hours | yearFilter}}年经验 
							<text class="sp">|</text> {{resumeInfo.user_politic}}
						</view>
					</view>
					<view class="portrait">
						<image class="cu-avatar round lg" :src="resumeInfo.user_head" mode="aspectFill"></image>
					</view>
				</view>
				<view class="content">
					<view class="number-info">
						<view class="phone">
							<text class="cuIcon-mobile icon"></text>
							<text class="text">{{resumeInfo.user_phone}}</text>
						</view>
						<view class="wx">
							<text class="cuIcon-weixin icon"></text>
							<text class="text">{{resumeInfo.user_wechat}}</text>
						</view>
						<view class="email" v-if="resumeInfo.user_mail">
							<text class="cuIcon-mail icon"></text>
							<text class="text">{{resumeInfo.user_mail}}</text>
						</view>
						<view class="state-body">
							<text class="cuIcon-emoji icon"></text>
							<text class="text">{{resumeInfo.job_status}}</text>
						</view>
					</view>
		
					<view class="job-intention-body body-info">
						<view class="header-title">
							<view class="title">
								求职意向
							</view>
						</view>
						<view class="body-item job-intention-item">
							<view class="key">
								{{resumeInfo.expected_position}}
							</view>
							<view class="value">
								{{resumeInfo.salary_requirements[0] == '面议' ? '薪资面议' : resumeInfo.salary_requirements.join(" - ")}}
							</view>
						</view>
						<view class="body-footer">
							{{resumeInfo.user_location.join("")}}
						</view>
					</view>
		
					<view class="form-body body-info">
						<view class="header-title">
							<view class="title">
								教育经历
							</view>
						</view>
						<block v-for="(educationalItem,index) in resumeInfo.educationalList" :key="index">
							<view class="body-item row-item">
								<view class="key">
									{{educationalItem.educational_school}}
								</view>
								<view class="value">
									{{educationalItem.educational_time.join(" ~ ")}}
								</view>
							</view>
							<view class="body-footer">
								{{educationalItem.educational_major}}—{{educationalItem.educational_education}}
							</view>
							<view class="body-footer" v-if="educationalItem.educational_about">
								{{educationalItem.educational_about}}
							</view>
						</block>
					</view>
		
					<view class="work-body body-info">
						<view class="header-title">
							<view class="title">
								工作经历
							</view>
						</view>
						<block v-for="(workItem,index) in resumeInfo.workList" :key="index">
							<view class="body-item row-item">
								<view class="key">
									{{workItem.work_name}}
								</view>
								<view class="value">
									{{workItem.work_time.join(" ~ ")}}
								</view>
							</view>
							<view class="body-footer">
								{{workItem.work_position}}
							</view>
		
							<view class="footer-info">
		
								<view class="cpywriting-body">
									<view class="cpywriting-item">
										<view class="cpywriting-title">
											工作内容：
										</view>
										<view class="cpywriting-info">
											{{workItem.work_about}}
										</view>
									</view>
									<view class="cpywriting-item">
										<view class="cpywriting-title">
											工作业绩：
										</view>
										<view class="cpywriting-info">
											{{workItem.work_achievement}}
										</view>
									</view>
								</view>
		
							</view>
						</block>
					</view>
		
					<view class="project-body body-info">
						<view class="header-title">
							<view class="title">
								项目经历
							</view>
						</view>
						<block v-for="(projectItem,index) in resumeInfo.projectList" :key="index">
							<view class="body-item row-item">
								<view class="key">
									{{projectItem.project_name}}
								</view>
								<view class="value">
									{{projectItem.project_time.join(" ~ ")}}
								</view>
							</view>
							<view class="body-footer">
								{{projectItem.project_position}}
							</view>
		
							<view class="footer-info">
								<view class="cpywriting-body">
									<view class="cpywriting-item">
										<view class="cpywriting-title">
											项目描述：
										</view>
										<view class="cpywriting-info">
											{{projectItem.project_about}}
										</view>
									</view>
									<view class="cpywriting-item">
										<view class="cpywriting-title">
											项目成果：
										</view>
										<view class="cpywriting-info">
											{{projectItem.project_achievement}}
										</view>
									</view>
								</view>
		
							</view>
						</block>
					</view>
		
					<view class="major-body body-info" v-if="resumeInfo.major_about">
						<view class="header-title">
							<view class="title">
								专业技能
							</view>
						</view>
						<view class="body-item major-item">
							{{resumeInfo.major_about || ''}}
						</view>
					</view>
		
					<view class="evaluate-body body-info" v-if="resumeInfo.evaluate_about">
						<view class="header-title">
							<view class="title">
								自我评价
							</view>
						</view>
						<view class="body-item evaluate-item">
							{{resumeInfo.evaluate_about || ''}}
						</view>
					</view>
					
				</view>
			</view>
		</view>
		<view class="to-home-body" v-if="isShare" @click="goHome">
			<view class="to-home-icon text-gray cuIcon-home"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "component0",
		props: {
			"resumeInfo": Object,
			"isShare": Boolean
		},
		methods: {
			goHome() {
				// 返回首页
				this.$comm.reLaunch("/pages/index/index")
			}
		}
	}
</script>

<style lang="scss">
	@import "@/static/scss/resume.scss";
	.tpl1 {
		.info-body {
			width: 100%!important;
		}
		.header-title {
			background-color: rgba(0, 0, 0, 0.06);
			.title::before {
				background-color: #333!important;
			}
		}
		.job-intention-item .value {
			color: $index-color!important;
		}
	}
</style>