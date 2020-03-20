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
                <el-table-column type="expand">
                    <template v-slot="scope">
                        <el-row v-for="(item1, i1) in scope.row.children" :key="item1.id" :class="['bdbottom', i1===0 ? 'bdtop' : '', 'vcenter']">
                            <!-- 渲染一级权限 -->
                            <el-col :span="5">
                                <el-tag closable @close="deleteRightById(scope.row, item1.id)">{{item1.authName}}</el-tag>
                                <i class="el-icon-caret-right"></i>
                            </el-col>
                            <!-- 渲染二级、三级权限 -->
                            <el-col :span="19">
                                <!-- 渲染二级权限 -->
                                <el-row v-for="(item2, i2) in item1.children" :key="item2.id" :class="[i2===0 ? '' : 'bdtop', 'vcenter']" >
                                    <el-col :span="6">
                                        <el-tag type="success" closable @close="deleteRightById(scope.row, item2.id)">{{item2.authName}}</el-tag>
                                        <i class="el-icon-caret-right"></i>
                                    </el-col>

                                    <el-col :span="18">
                                        <el-tag type="warning" v-for="item3 in item2.children" :key="item3.id" closable @close="deleteRightById(scope.row, item3.id)">{{item3.authName}}</el-tag>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="角色名称" prop="roleName"></el-table-column>
                <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
                <el-table-column label="操作" v-slot="scope">
                    <template>
                        <!-- 编辑按钮 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditRoleDialog(scope.row.id)">编辑</el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteRole(scope.row.id)">删除</el-button>
                        <!-- 分配权限按钮 -->
                        <el-button type="warning" icon="el-icon-setting" size="mini" @click="showSetRightDialog(scope.row)">分配权限</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- 修改用户的对话框 -->
        <el-dialog title="修改用户" :visible.sync="addRoleDialogVisible" width="50%" @close="addRoleDialogClosed">
            <!-- 内容主体区域 -->
            <el-form :model="addRoleForm" :rules="RoleFormRules" ref="addRoleFormRef" label-width="80px">
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

        <!-- 编辑用户的对话框 -->
        <el-dialog title="修改用户" :visible.sync="editRoleDialogVisible" width="50%" @close="editRoleDialogClosed">
            <!-- 内容主体区域 -->
            <el-form :model="editRoleForm" :rules="RoleFormRules" ref="editRoleFormRef" label-width="80px">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="editRoleForm.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc">
                    <el-input v-model="editRoleForm.roleDesc"></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="editRoleDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editRole">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 设置角色权限的对话框 -->
        <el-dialog title="分配权限" :visible.sync="setRightDialogVisible" width="50%" @close="setRightDialogClosed">
            <el-tree :data="rightslist" :props="treeProps" show-checkbox node-key="id" default-expand-all :default-checked-keys="defKeys" ref="treeRef"></el-tree>

            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="setRightDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="allotRights">确 定</el-button>
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
                rightslist: [],
                treeProps: {
                    label: 'authName',
                    children: 'children'
                },
                defKeys: [],
                roleId: '',
                addRoleDialogVisible: false,
                editRoleDialogVisible: false,
                setRightDialogVisible: false,
                addRoleForm: {
                    roleName: '',
                    roleDesc: ''
                },
                editRoleForm: {
                    roleId: '',
                    roleName: '',
                    roleDesc: ''
                },
                RoleFormRules: {
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
                const {data: res} = await this.$http.get('/roles');
                if(res.meta.status != 200) return this.$message.error('获取角色列表失败！');
                this.roleslist = res.data;
            },
            addRoleDialogClosed() {
                this.$refs.addRoleFormRef.resetFields();
            },
            editRoleDialogClosed() {
                this.$refs.editRoleFormRef.resetFields();
            },
            async showEditRoleDialog(id){
                const {data: res} = await this.$http.get('roles/' + id);
                if(res.meta.status != 200) return;
                this.editRoleForm = res.data;
                this.editRoleDialogVisible = true;
            },
            //添加角色
            addRole() {
                this.$refs.addRoleFormRef.validate(async valid => {
                    if(!valid) return;
                    const{data: res} = await this.$http.post('roles', this.addRoleForm);
                    if(res.meta.status!=201) return this.$message.error('添加角色失败');
                    this.$message.success('添加角色成功');
                    this.getRolesList();
                    this.addRoleDialogVisible = false;
                })
            },
            //编辑角色
            editRole() {
                this.$refs.editRoleFormRef.validate(async valid => {
                    if (!valid) return;
                    const{data: res} = await this.$http.put('roles/' + this.editRoleForm.roleId, {
                        roleName: this.editRoleForm.roleName,
                        roleDesc: this.editRoleForm.roleDesc
                    });
                    if(res.meta.status != 200) return this.$message.error('编辑角色失败');
                    this.getRolesList();
                    this.editRoleDialogVisible = false;
                    this.$message.success('编辑角色成功');
                })
            },
            //删除角色
            async deleteRole(id) {
                const confirmResult = await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(error => error);

                if(confirmResult != 'confirm') return this.$message.warning('已取消删除')
                const{data: res} = await this.$http.delete('roles/'+id);
                if(res.meta.status != 200) return this.$message.error('删除角色失败');
                this.$message.success('删除角色成功');
                this.getRolesList();
            },
            //根据id删除权限
            async deleteRightById(role, rightId){
                const confirmResult = await this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(error => error);

                if(confirmResult != 'confirm') return this.$message.warning('已取消删除');
                const {data: res} = await this.$http.delete(`roles/${role.id}/rights/${rightId}`);
                if (res.meta.status != 200) return this.$message.error('删除角色权限失败');

                role.children = res.data;
            },
            async showSetRightDialog(role) {
                this.roleId = role.id;
                const {data:res} = await this.$http.get('rights/tree')

                if (res.meta.status != 200) return this.$message.error('获取权限数据失败');
                this.rightslist = res.data;
                this.getLeafKeys(role, this.defKeys)
                this.setRightDialogVisible = true;

            },
            getLeafKeys(node, arr){
                if (!node.children) {
                    return arr.push(node.id)
                }

                node.children.forEach(item => {
                    this.getLeafKeys(item, arr)
                });
            },
            setRightDialogClosed() {
                this.defKeys = [];
            },
            async allotRights() {
                const keys = [ ...this.$refs.treeRef.getCheckedKeys(), ...this.$refs.treeRef.getHalfCheckedKeys() ];
                const idStr = keys.join(',');
                const {data: res} = await this.$http.post(`roles/${this.roleId}/rights`, {rids: idStr})
                if(res.meta.status != 200) return  this.$message.error('分配权限失败');
                this.$message.success('分配权限成功');
                this.getRolesList();
                this.setRightDialogVisible = false;
            }
        }
    }
</script>

<style lang="less" scoped>
    .el-tag {
        margin: 7px;
    }

    .bdtop {
        border-top: 1px solid #eee;
    }

    .bdbottom {
        border-bottom: 1px solid #eee;
    }

    .vcenter {
        display: flex;
        align-items: center;
    }
</style>