<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-button type="primary" @click="addRoleDialogVisible=true">添加角色</el-button>

            <!-- 权限列表区域 -->
            <el-table border stripe :data="roleslist">
                <el-table-column type="expand"></el-table-column>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="角色名称" prop="roleName"></el-table-column>
                <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
                <el-table-column label="操作">
                    <template>
                        <!-- 编辑按钮 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                        <!-- 分配权限按钮 -->
                        <el-button type="warning" icon="el-icon-setting" size="mini">分配权限</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- 修改用户的对话框 -->
        <el-dialog title="修改用户" :visible.sync="addRoleDialogVisible" width="50%" @close="addDialogDialogClosed">
            <!-- 内容主体区域 -->
            <el-form :model="addRoleForm" :rules="addRoleFormRules" ref="addRoleFormRef" label-width="80px">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="addRoleForm.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc">
                    <el-input v-model="addRoleForm.roleDesc"></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addRoleDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addRole">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Roles",
        data() {
            return {
                //角色列表数据
                roleslist: [],
                addRoleDialogVisible: false,
                addRoleForm: {
                    roleName: '',
                    roleDesc: ''
                },
                addRoleFormRules: {
                    roleName: [
                        { required: true, message: '请输入角色名称', trigger: 'blur' }
                    ]
                }
            }
        },
        created() {
            this.getRolesList()
        },
        methods: {
            async getRolesList() {
                const {data: res} = await this.$http.get('/roles')
                if(res.meta.status != 200) return this.$message.error('获取角色列表失败！')
                this.roleslist = res.data
            },
            addDialogDialogClosed() {
                this.$refs.addRoleFormRef.resetFields()
            },
            addRole() {
                this.$refs.addRoleFormRef.validate(async valid => {
                    if(!valid) return
                    const{data: res} = await this.$http.post('roles', this.addRoleForm)
                    if(res.meta.status!=201) return this.$message.error('添加角色失败')
                    this.$message.success('添加角色成功')
                    this.getRolesList()
                    this.addRoleDialogVisible = false
                })


            }
        }
    }
</script>

<style lang="less" scoped>

</style>